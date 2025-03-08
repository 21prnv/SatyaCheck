import { createClient } from '@supabase/supabase-js';

export const getSupabaseCredentials = async () => {
  if (chrome.storage) {
    // Running as Chrome extension
    const result = await chrome.storage.local.get(['supabaseUrl', 'supabaseAnonKey']);
    return {
      supabaseUrl: result.supabaseUrl,
      supabaseAnonKey: result.supabaseAnonKey
    };
  } else {
    // Running in development
    return {
      supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
      supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY
    };
  }
};

export const createSupabaseClient = async () => {
  const { supabaseUrl, supabaseAnonKey } = await getSupabaseCredentials();
  return createClient(supabaseUrl, supabaseAnonKey);
}; 