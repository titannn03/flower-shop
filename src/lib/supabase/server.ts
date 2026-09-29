// src/lib/supabase/server.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.PUBLIC_SUPABASE_ANON_KEY || '';

export const isServerSupabaseConfigured = Boolean(supabaseUrl && serviceRoleKey);

export const supabaseServer = isServerSupabaseConfigured
  ? createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null;
