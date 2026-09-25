import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://hvqovgrydjhadecxtqxv.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_j526ONqTr4MYyTXI2IM0zQ_wvONvqmn";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
