import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { SOCIAL_INCENTIVES, calculateUserTier } from '@/lib/validations';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, platform, action = 'share' } = body;

    if (!userId || !platform) {
      return NextResponse.json(
        { success: false, error: 'User ID and platform are required' },
        { status: 400 }
      );
    }

    // Get user data
    const { data: user, error: userError } = await supabase
      .from('waitlist_signups')
      .select('*')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Find social incentive for platform
    const incentive = SOCIAL_INCENTIVES.find(s => s.platform === platform);
    if (!incentive) {
      return NextResponse.json(
        { success: false, error: 'Invalid platform' },
        { status: 400 }
      );
    }

    if (action === 'share') {
      // Check if user has already shared on this platform in the last 24 hours
      const { data: recentShares, error: sharesError } = await supabase
        .from('social_shares')
        .select('*')
        .eq('user_id', userId)
        .eq('platform', platform)
        .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

      if (sharesError) {
        console.error('Error checking recent shares:', sharesError);
        return NextResponse.json(
          { success: false, error: 'Database error' },
          { status: 500 }
        );
      }

      if (recentShares && recentShares.length > 0) {
        return NextResponse.json(
          { success: false, error: 'You can only share once per platform per day' },
          { status: 429 }
        );
      }

      // Record the share
      const { error: shareError } = await supabase
        .from('social_shares')
        .insert({
          user_id: userId,
          platform,
          points_awarded: incentive.pointsReward,
          verified: false, // Will be verified later if needed
        });

      if (shareError) {
        console.error('Error recording share:', shareError);
        return NextResponse.json(
          { success: false, error: 'Failed to record share' },
          { status: 500 }
        );
      }

      // Award points to user
      const { error: pointsError } = await supabase.rpc('award_points', {
        user_id: userId,
        points: incentive.pointsReward
      });

      if (pointsError) {
        console.error('Error awarding points:', pointsError);
      }

      // Get updated user data
      const { data: updatedUser, error: updateError } = await supabase
        .from('waitlist_signups')
        .select('*')
        .eq('id', userId)
        .single();

      if (updateError) {
        console.error('Error fetching updated user:', updateError);
      }

      const newTier = calculateUserTier(
        updatedUser?.referral_count || 0, 
        updatedUser?.points_earned || 0
      );

      // Check if tier upgraded
      const oldTier = calculateUserTier(
        user.referral_count || 0, 
        user.points_earned || 0
      );

      const tierUpgraded = newTier.priority > oldTier.priority;

      return NextResponse.json({
        success: true,
        data: {
          pointsAwarded: incentive.pointsReward,
          totalPoints: updatedUser?.points_earned || 0,
          newTier,
          tierUpgraded,
          shareData: {
            message: incentive.message,
            url: `${incentive.url}?ref=${user.referral_code}`,
            hashtags: incentive.hashtags,
            platform: incentive.platform,
          }
        }
      });
    }

    if (action === 'verify') {
      // Verify a share (for platforms that allow verification)
      const { shareId } = body;
      
      if (!shareId) {
        return NextResponse.json(
          { success: false, error: 'Share ID is required for verification' },
          { status: 400 }
        );
      }

      const { error: verifyError } = await supabase
        .from('social_shares')
        .update({ verified: true })
        .eq('id', shareId)
        .eq('user_id', userId);

      if (verifyError) {
        console.error('Error verifying share:', verifyError);
        return NextResponse.json(
          { success: false, error: 'Failed to verify share' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Share verified successfully'
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Social API error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Get user's sharing history
    const { data: shares, error: sharesError } = await supabase
      .from('social_shares')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (sharesError) {
      console.error('Error fetching shares:', sharesError);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch sharing history' },
        { status: 500 }
      );
    }

    // Get available incentives with user's eligibility
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const availableIncentives = SOCIAL_INCENTIVES.map(incentive => {
      const recentShare = shares?.find(
        s => s.platform === incentive.platform && 
        new Date(s.created_at) > yesterday
      );

      return {
        ...incentive,
        available: !recentShare,
        lastShared: recentShare?.created_at || null,
        pointsAwarded: recentShare?.points_awarded || 0,
      };
    });

    return NextResponse.json({
      success: true,
      data: {
        incentives: availableIncentives,
        sharingHistory: shares || [],
      }
    });

  } catch (error) {
    console.error('Social GET API error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 