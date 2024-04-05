import { supabase } from '@/config/supabaseClient'
import { redirect } from 'react-router-dom'

export async function logoutAction() {
  let { error } = await supabase.auth.signOut()
  if (error) console.log('Error logging out:', error.message)
  return redirect('/')
}
