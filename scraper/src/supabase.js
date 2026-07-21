import { createClient } from '@supabase/supabase-js';
import { logger } from './utils/logger.js';

// Trim whitespace and any trailing slash from the URL. A trailing slash makes
// supabase-js build "https://xxx.supabase.co//rest/v1/..." (double slash), which
// the API gateway rejects with "Invalid path specified in request URL".
const supabaseUrl = (process.env.SUPABASE_URL || '').trim().replace(/\/+$/, '');
const supabaseKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();

// TEMP DIAGNOSTIC (no secret exposed): report the URL's structure only.
try {
  const u = new URL(supabaseUrl);
  logger.info(
    `URL diag → protocol:${u.protocol} hostEndsWith.supabase.co:${u.hostname.endsWith('.supabase.co')} ` +
    `hostLen:${u.hostname.length} pathname:"${u.pathname}" keyLen:${supabaseKey.length}`
  );
} catch (e) {
  logger.error(`URL diag → not a parseable URL (len:${supabaseUrl.length}): ${e.message}`);
}

export const db = createClient(supabaseUrl, supabaseKey);
