# MindMuscle Waitlist Setup Guide 🚀

This guide will help you set up the complete waitlist integration with Supabase backend.

## 📋 Prerequisites

- Supabase account (free tier works fine)
- Next.js project with the waitlist code

## 🗄️ Database Setup

### 1. Create Supabase Tables

Run these SQL commands in your Supabase SQL editor:

```sql
-- Create waitlist_signups table
CREATE TABLE waitlist_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  interests TEXT[],
  referral_code TEXT UNIQUE NOT NULL,
  referrer_id UUID REFERENCES waitlist_signups(id),
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create referral_stats table
CREATE TABLE referral_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES waitlist_signups(id) UNIQUE,
  total_referrals INTEGER DEFAULT 0,
  successful_referrals INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_waitlist_email ON waitlist_signups(email);
CREATE INDEX idx_waitlist_referral_code ON waitlist_signups(referral_code);
CREATE INDEX idx_waitlist_created_at ON waitlist_signups(created_at);
CREATE INDEX idx_referral_stats_user_id ON referral_stats(user_id);

-- Create function to increment referral count
CREATE OR REPLACE FUNCTION increment_referral_count(user_id UUID)
RETURNS VOID AS $$
BEGIN
  INSERT INTO referral_stats (user_id, total_referrals, successful_referrals)
  VALUES (user_id, 1, 1)
  ON CONFLICT (user_id)
  DO UPDATE SET
    total_referrals = referral_stats.total_referrals + 1,
    successful_referrals = referral_stats.successful_referrals + 1,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_waitlist_signups_updated_at
  BEFORE UPDATE ON waitlist_signups
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_referral_stats_updated_at
  BEFORE UPDATE ON referral_stats
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 2. Set Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_stats ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (for waitlist signup)
CREATE POLICY "Allow public inserts" ON waitlist_signups
  FOR INSERT TO public
  WITH CHECK (true);

-- Allow public select for referral validation
CREATE POLICY "Allow public select for referral validation" ON waitlist_signups
  FOR SELECT TO public
  USING (true);

-- Allow public inserts for referral stats
CREATE POLICY "Allow public inserts on referral stats" ON referral_stats
  FOR INSERT TO public
  WITH CHECK (true);

-- Allow public updates for referral stats
CREATE POLICY "Allow public updates on referral stats" ON referral_stats
  FOR UPDATE TO public
  USING (true);
```

## 🔑 Environment Variables

Create a `.env.local` file in your project root with these variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: For production analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

### How to get Supabase credentials:

1. Go to your Supabase project dashboard
2. Click on "Settings" → "API"
3. Copy the "Project URL" for `NEXT_PUBLIC_SUPABASE_URL`
4. Copy the "anon public" key for `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🧪 Testing the Setup

### 1. Test Database Connection

Create a simple test page or run this in your browser console:

```javascript
// Test Supabase connection
const { data, error } = await supabase
  .from('waitlist_signups')
  .select('count(*)')
  .single();

console.log('Connection test:', { data, error });
```

### 2. Test Waitlist Signup

1. Navigate to your waitlist section
2. Fill out the form with a test email
3. Check your Supabase dashboard to see if the record was created

### 3. Test Referral System

1. Sign up with an email
2. Copy the referral code from the success page
3. Open a new incognito window
4. Use the referral code to sign up another email
5. Check the database to verify the referral relationship

## 📊 Monitoring & Analytics

### View Waitlist Stats

```sql
-- Total signups
SELECT COUNT(*) as total_signups FROM waitlist_signups;

-- Signups by day
SELECT 
  DATE(created_at) as signup_date,
  COUNT(*) as signups
FROM waitlist_signups 
GROUP BY DATE(created_at) 
ORDER BY signup_date DESC;

-- Top referrers
SELECT 
  ws.email,
  ws.first_name,
  rs.total_referrals,
  rs.successful_referrals
FROM waitlist_signups ws
JOIN referral_stats rs ON ws.id = rs.user_id
ORDER BY rs.successful_referrals DESC
LIMIT 10;

-- Interest analysis
SELECT 
  UNNEST(interests) as interest,
  COUNT(*) as count
FROM waitlist_signups 
WHERE interests IS NOT NULL
GROUP BY interest
ORDER BY count DESC;
```

## 🚀 Deployment

### Environment Variables in Production

Make sure to add your environment variables to your deployment platform:

- **Vercel**: Project Settings → Environment Variables
- **Netlify**: Site Settings → Environment Variables
- **Railway**: Variables tab in your project

### Rate Limiting

The current implementation includes basic rate limiting (3 requests per 15 minutes per IP). For production, consider:

- Using Redis for distributed rate limiting
- Implementing CAPTCHA for additional security
- Adding honeypot fields to prevent bots

## 🔧 Customization

### Adding New Fields

1. Add the field to the database schema
2. Update the Zod validation schema in `src/lib/validations.ts`
3. Add the field to the form component
4. Update the API route to handle the new field

### Custom Referral Rewards

Modify the referral stats in the success screen and create custom logic in your API route based on referral counts.

## 🆘 Troubleshooting

### Common Issues

1. **"Missing Supabase environment variables"**
   - Check that your `.env.local` file is in the project root
   - Verify the variable names match exactly

2. **"Database error occurred"**
   - Check your Supabase project is active
   - Verify the API key has the right permissions
   - Check the database tables exist

3. **"Invalid referral code"**
   - Ensure the referral code exists in the database
   - Check the code format (6 characters, alphanumeric)

4. **Rate limiting issues**
   - The rate limit resets every 15 minutes
   - Check if you're testing from the same IP address

### Debug Mode

Add this to your API route for debugging:

```javascript
console.log('Debug info:', {
  body: JSON.stringify(body, null, 2),
  clientIP,
  headers: Object.fromEntries(request.headers.entries())
});
```

## 📈 Next Steps

1. Set up email notifications for new signups
2. Create an admin dashboard to view waitlist data
3. Implement email templates for different referral milestones
4. Add social sharing for better viral growth
5. Set up automated launch notifications

---

🎉 **Congratulations!** Your AI-powered waitlist with referral tracking is now ready to collect early adopters and build momentum for your launch!

For support or questions, check the implementation files or create an issue in the repository. 