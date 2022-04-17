const { createClient } = require("@supabase/supabase-js");

const SUPABASE_KEY =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxcXhjYmlqcGlpeHRlZ2VtYXN6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY0OTk3NzgxNiwiZXhwIjoxOTY1NTUzODE2fQ.JD_rkiTiHT_CW_KlQflmgDU6pkhqsNpuheainwZY1Gk";

const SUPABASE_URL = "https://gqqxcbijpiixtegemasz.supabase.co";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

module.exports = supabase;
