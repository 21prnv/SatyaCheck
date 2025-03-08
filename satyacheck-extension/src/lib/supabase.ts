import { createClient } from '@supabase/supabase-js';

const supabaseUrl ="https://exgdnzhsiwtguvwvjsqc.supabase.co";
const supabaseAnonKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4Z2RuemhzaXd0Z3V2d3Zqc3FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0MzE5OTYsImV4cCI6MjA1NzAwNzk5Nn0.-yYNdu1Uh-Jr5KFAl1emilpMsqGnH_cXkzEBAaqYIZM";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface NewsResult {
  id?: bigint;
  user_id?: string; // uuid
  created_at?: string; // timestamptz
  isFake: string;
  fake_percentage: bigint;
  real_percentage: string;
  reasons_for_determination: string;
  related_links: string[];
  author_verified: string;
  post_date: string;
  subject_expertise: string;
  media_presence: string;
  cross_check_sources: string[];
  upvotes: bigint;
}