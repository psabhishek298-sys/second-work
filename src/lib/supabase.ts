import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://icowcfqtbredifkbgepx.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imljb3djZnF0YnJlZGlma2JnZXB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA5MzcwMjQsImV4cCI6MjEwNjUxMzAyNH0.s3fcTaxV364E_IkI4uaM0OupQUUBMPpomZPixzM1gHg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
