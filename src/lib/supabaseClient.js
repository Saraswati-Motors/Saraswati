import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let supabaseInstance = null

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing from environment variables. Running in Mock fallback mode.")
} else {
  try {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        storage: window.sessionStorage, // Logs out when tab closes
        autoRefreshToken: true,
        persistSession: true
      }
    })
  } catch (e) {
    console.error("Failed to initialize Supabase client:", e.message)
  }
}

export const supabase = supabaseInstance


