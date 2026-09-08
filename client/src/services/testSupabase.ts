import { supabase } from './supabase';

console.log("Supabase URL:", import.meta.env.VITE_SUPABASE_URL);

const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .limit(1);

console.log("Supabase Test Data:", data);
console.log("Supabase Test Error:", error);
console.log("Supabase Test Error JSON:", JSON.stringify(error, null, 2));