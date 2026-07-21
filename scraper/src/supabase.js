import { createClient } from '@supabase/supabase-js';

// supabase-js expects the *base* project URL (https://<ref>.supabase.co) and
// appends its own "/rest/v1/..." path. If SUPABASE_URL includes a path such as
// "/rest/v1" (as shown on the Data API settings page) or a trailing slash, the
// client builds ".../rest/v1/rest/v1/..." and the gateway rejects it with
// "Invalid path specified in request URL". Reduce the value to its origin so it
// works no matter which form was pasted in.
function normalizeSupabaseUrl(raw) {
  const trimmed = (raw || '').trim();
  try {
    return new URL(trimmed).origin;
  } catch {
    return trimmed.replace(/\/+$/, ''); // fall back to a best-effort cleanup
  }
}

const supabaseUrl = normalizeSupabaseUrl(process.env.SUPABASE_URL);
const supabaseKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();

export const db = createClient(supabaseUrl, supabaseKey);
