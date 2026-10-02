// src/lib/supabase/server.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL || '';
const secretKey = process.env.SUPABASE_SECRET_KEY || process.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

export const isServerSupabaseConfigured = Boolean(supabaseUrl && secretKey);

export const supabaseServer = isServerSupabaseConfigured
  ? createClient(supabaseUrl, secretKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null;
