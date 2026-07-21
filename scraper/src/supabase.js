import { createClient } from '@supabase/supabase-js';

// Trim whitespace and any trailing slash from the URL. A trailing slash makes
// supabase-js build "https://xxx.supabase.co//rest/v1/..." (double slash), which
// the API gateway rejects with "Invalid path specified in request URL".
const supabaseUrl = (process.env.SUPABASE_URL || '').trim().replace(/\/+$/, '');
const supabaseKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();

export const db = createClient(supabaseUrl, supabaseKey);
