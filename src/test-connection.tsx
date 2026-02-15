import { supabase } from './lib/supabaseClient'

// Test connection function
export const testSupabaseConnection = async () => {
  try {
    console.log('Testing Supabase connection...')
    console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL)
    console.log('Supabase Key exists:', !!import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY)
    
    const { data, error } = await supabase
      .from('projects')
      .select('title, Glink')
      .limit(1)
    
    console.log('Connection test result:', { data, error })
    
    if (error) {
      console.error('Supabase error:', error)
      return false
    }
    
    console.log('✅ Supabase connection successful!')
    return true
  } catch (err) {
    console.error('Connection test failed:', err)
    return false
  }
}

// Call this function in your browser console
// testSupabaseConnection()
