const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://gqqxcbijpiixtegemasz.supabase.co",
  process.env.SUPABASE_KEY
);

module.exports = supabase;
