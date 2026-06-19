// Supabase client initialization
// Replace these values with your actual Supabase project credentials
// from https://supabase.com/dashboard/project/_/settings/api
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ─── Helper: Get public URL for Storage ───────────────────────────────────────
export const getStorageUrl = (bucket, path) => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data?.publicUrl
}
