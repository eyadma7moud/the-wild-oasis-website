import { createClient } from "@supabase/supabase-js";
console.log({
  hasUrl: Boolean(process.env.SUPABASE_URL),
  hasKey: Boolean(process.env.SUPABASE_KEY),
});
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
);
