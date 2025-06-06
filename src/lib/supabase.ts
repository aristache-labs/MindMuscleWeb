import { createClient } from '@supabase/supabase-js';

// Database types
export interface Database {
  public: {
    Tables: {
      waitlist_signups: {
        Row: {
          id: string;
          email: string;
          first_name: string | null;
          interests: string[] | null;
          referral_code: string | null;
          referrer_id: string | null;
          utm_source: string | null;
          utm_medium: string | null;
          utm_campaign: string | null;
          ip_address: string | null;
          user_agent: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          first_name?: string | null;
          interests?: string[] | null;
          referral_code?: string | null;
          referrer_id?: string | null;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          first_name?: string | null;
          interests?: string[] | null;
          referral_code?: string | null;
          referrer_id?: string | null;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      referral_stats: {
        Row: {
          id: string;
          user_id: string;
          total_referrals: number;
          successful_referrals: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          total_referrals?: number;
          successful_referrals?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          total_referrals?: number;
          successful_referrals?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      analytics_events: {
        Row: {
          id: string;
          event_name: string;
          timestamp: string;
          session_id: string | null;
          user_id: string | null;
          properties: any | null;
          page: string | null;
          duration: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          event_name: string;
          timestamp?: string;
          session_id?: string | null;
          user_id?: string | null;
          properties?: any | null;
          page?: string | null;
          duration?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          event_name?: string;
          timestamp?: string;
          session_id?: string | null;
          user_id?: string | null;
          properties?: any | null;
          page?: string | null;
          duration?: number | null;
          created_at?: string;
        };
      };
      analytics_sessions: {
        Row: {
          id: string;
          session_id: string;
          user_id: string | null;
          start_time: string;
          duration: number | null;
          event_count: number | null;
          funnel_steps: number | null;
          ab_tests: any | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          user_id?: string | null;
          start_time?: string;
          duration?: number | null;
          event_count?: number | null;
          funnel_steps?: number | null;
          ab_tests?: any | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          session_id?: string;
          user_id?: string | null;
          start_time?: string;
          duration?: number | null;
          event_count?: number | null;
          funnel_steps?: number | null;
          ab_tests?: any | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
  },
});

// Utility functions
export const generateReferralCode = (): string => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

export const getClientIP = async (): Promise<string | null> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch {
    return null;
  }
}; 