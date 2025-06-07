import { NextRequest, NextResponse } from 'next/server';
import { supabase, generateReferralCode } from '@/lib/supabase';
import { 
  waitlistFormSchema, 
  sanitizeFormData,
  calculateUserTier,
  POINTS_CONFIG,
  maskEmail
} from '@/lib/validations';

// Rate limiting (in production, use Redis or similar)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_REQUESTS = 3; // Max 3 submissions per 15 minutes per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const requests = rateLimitMap.get(ip) || [];
  
  // Clean old requests
  const validRequests = requests.filter((time: number) => now - time < RATE_LIMIT_WINDOW);
  
  if (validRequests.length >= RATE_LIMIT_REQUESTS) {
    return true;
  }
  
  validRequests.push(now);
  rateLimitMap.set(ip, validRequests);
  return false;
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const remoteAddr = request.headers.get('remote-addr');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  if (remoteAddr) {
    return remoteAddr;
  }
  
  return 'unknown';
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(request);
    
    // Check rate limiting
    if (isRateLimited(clientIP)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Too many requests. Please try again later.',
          code: 'RATE_LIMITED'
        },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    
    // Validate form data
    const validationResult = waitlistFormSchema.safeParse(body);
    
    if (!validationResult.success) {
      const errors = validationResult.error.errors.reduce((acc, error) => {
        acc[error.path[0]] = error.message;
        return acc;
      }, {} as Record<string, string>);
      
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed',
          errors,
          code: 'VALIDATION_ERROR'
        },
        { status: 400 }
      );
    }

    const formData = sanitizeFormData(validationResult.data);
    
    // Check if email already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('waitlist_signups')
      .select('id, email, referral_code, points_earned, referral_count')
      .eq('email', formData.email)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Database check error:', checkError);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Database error occurred',
          code: 'DATABASE_ERROR',
          details: process.env.NODE_ENV === 'development' ? checkError.message : undefined
        },
        { status: 500 }
      );
    }

    if (existingUser) {
      // Return existing user data with updated position
      const { count: currentPosition } = await supabase
        .from('waitlist_signups')
        .select('*', { count: 'exact', head: true })
        .lte('created_at', new Date().toISOString());

      const currentTier = calculateUserTier(existingUser.referral_count || 0, existingUser.points_earned || 0);

      return NextResponse.json({
        success: true,
        message: 'You\'re already on the waitlist!',
        data: {
          id: existingUser.id,
          email: existingUser.email,
          referralCode: existingUser.referral_code,
          position: currentPosition || null,
          tier: currentTier,
          isReturning: true,
        },
      });
    }

    // Handle referral code validation
    let referrerId = null;
    let referrerData = null;
    if (formData.referralCode) {
      const { data: referrer, error: referrerError } = await supabase
        .from('waitlist_signups')
        .select('id, first_name, email')
        .eq('referral_code', formData.referralCode)
        .single();

      if (referrerError && referrerError.code !== 'PGRST116') {
        console.error('Referrer check error:', referrerError);
      } else if (!referrer) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Invalid referral code',
            code: 'INVALID_REFERRAL'
          },
          { status: 400 }
        );
      } else {
        referrerId = referrer.id;
        referrerData = referrer;
      }
    }

    // Generate unique referral code for new user
    let userReferralCode: string;
    let codeExists = true;
    let attempts = 0;
    const maxAttempts = 10;

    do {
      userReferralCode = generateReferralCode();
      const { data: existingCode } = await supabase
        .from('waitlist_signups')
        .select('id')
        .eq('referral_code', userReferralCode)
        .single();
      
      codeExists = !!existingCode;
      attempts++;
    } while (codeExists && attempts < maxAttempts);

    if (codeExists) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Unable to generate referral code. Please try again.',
          code: 'REFERRAL_CODE_ERROR'
        },
        { status: 500 }
      );
    }

    // Calculate initial points
    let initialPoints = 0;
    if (formData.firstName && formData.interests?.length) {
      initialPoints += POINTS_CONFIG.FORM_COMPLETION;
    }

    // Get user agent
    const userAgent = request.headers.get('user-agent') || null;

    // Insert new waitlist signup with enhanced data
    const { data: newUser, error: insertError } = await supabase
      .from('waitlist_signups')
      .insert({
        email: formData.email,
        first_name: formData.firstName || null,
        interests: formData.interests || null,
        referral_code: userReferralCode,
        referrer_id: referrerId,
        points_earned: initialPoints,
        referral_count: 0,
        utm_source: formData.utmSource || null,
        utm_medium: formData.utmMedium || null,
        utm_campaign: formData.utmCampaign || null,
        ip_address: clientIP !== 'unknown' ? clientIP : null,
        user_agent: userAgent,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to join waitlist. Please try again.',
          code: 'INSERT_ERROR'
        },
        { status: 500 }
      );
    }

    // Update referrer stats if applicable
    if (referrerId) {
      // Award points to referrer and increment their referral count
      await supabase.rpc('award_referral_points', { 
        user_id: referrerId,
        points: POINTS_CONFIG.REFERRAL_SIGNUP
      });
    }

    // Get current waitlist position
    const { count: waitlistPosition } = await supabase
      .from('waitlist_signups')
      .select('*', { count: 'exact', head: true });

    // Calculate user tier
    const userTier = calculateUserTier(0, initialPoints);

    // Return enhanced success response
    return NextResponse.json({
      success: true,
      message: 'Successfully joined the waitlist!',
      data: {
        id: newUser.id,
        email: newUser.email,
        referralCode: userReferralCode,
        position: waitlistPosition || null,
        pointsEarned: initialPoints,
        tier: userTier,
        firstName: newUser.first_name,
        referredBy: referrerData ? {
          name: referrerData.first_name || 'A friend',
          email: maskEmail(referrerData.email)
        } : null,
      },
    });

  } catch (error) {
    console.error('Waitlist API error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'An unexpected error occurred. Please try again.',
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    );
  }
}

// Handle GET requests for referral code validation and user data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const referralCode = searchParams.get('referral');
    const email = searchParams.get('email');
    const action = searchParams.get('action') || 'validate-referral';
    
    if (action === 'validate-referral') {
      if (!referralCode) {
        return NextResponse.json(
          { valid: false, error: 'Referral code is required' },
          { status: 400 }
        );
      }

      // Validate referral code format
      if (!/^[A-Z0-9]{6}$/.test(referralCode.toUpperCase())) {
        return NextResponse.json({ valid: false, error: 'Invalid format' });
      }

      // Check if referral code exists
      const { data: referrer, error } = await supabase
        .from('waitlist_signups')
        .select('id, first_name, email')
        .eq('referral_code', referralCode.toUpperCase())
        .single();

      if (error || !referrer) {
        return NextResponse.json({ valid: false, error: 'Code not found' });
      }

      return NextResponse.json({ 
        valid: true, 
        referrer: referrer.first_name || 'A friend',
        referrerEmail: maskEmail(referrer.email)
      });
    }

    if (action === 'user-status' && email) {
      // Get user's current waitlist status
      const { data: user, error } = await supabase
        .from('waitlist_signups')
        .select('*')
        .eq('email', email)
        .single();

      if (error || !user) {
        return NextResponse.json(
          { found: false, error: 'User not found' },
          { status: 404 }
        );
      }

      // Calculate current position (approximate)
      const { count: position } = await supabase
        .from('waitlist_signups')
        .select('*', { count: 'exact', head: true })
        .lte('created_at', user.created_at);

      // Get total waitlist count
      const { count: totalUsers } = await supabase
        .from('waitlist_signups')
        .select('*', { count: 'exact', head: true });

      const currentTier = calculateUserTier(user.referral_count || 0, user.points_earned || 0);
      
      return NextResponse.json({
        found: true,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          position: position || null,
          totalUsers: totalUsers || null,
          referralCode: user.referral_code,
          referralCount: user.referral_count || 0,
          pointsEarned: user.points_earned || 0,
          tier: currentTier,
          joinedAt: user.created_at,
        }
      });
    }

    if (action === 'leaderboard') {
      // Get top performers for leaderboard
      const { data: topUsers, error } = await supabase
        .from('waitlist_signups')
        .select('first_name, email, referral_count, points_earned')
        .order('referral_count', { ascending: false })
        .order('points_earned', { ascending: false })
        .limit(20);

      if (error) {
        return NextResponse.json(
          { success: false, error: 'Failed to fetch leaderboard' },
          { status: 500 }
        );
      }

      const leaderboard = topUsers?.map((user, index) => ({
        rank: index + 1,
        user: {
          firstName: user.first_name || 'Anonymous',
          email: maskEmail(user.email),
          tier: calculateUserTier(user.referral_count || 0, user.points_earned || 0),
        },
        referrals: user.referral_count || 0,
        points: user.points_earned || 0,
      })) || [];

      return NextResponse.json({ success: true, leaderboard });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Waitlist GET error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 