import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://slggphnrfuxmoskhrthk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsZ2dwaG5yZnV4bW9za2hydGhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc1MDcwOTQsImV4cCI6MjAzMzA4MzA5NH0.FU0flwktPc6n3kkvX-vJuoFYhBSOXFBvmqCvAaZBsfg";

export const supabase = createClient(supabaseUrl, supabaseKey);