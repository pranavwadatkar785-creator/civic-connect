import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function getRequiredEnv(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const supabase = createClient(
  getRequiredEnv(supabaseUrl, "NEXT_PUBLIC_SUPABASE_URL"),
  getRequiredEnv(supabaseAnonKey, "NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);
