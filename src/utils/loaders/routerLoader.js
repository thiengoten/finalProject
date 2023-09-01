import { supabase } from '@/config/db/supabaseClient'

export async function navbarLoader() {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return !!user && user
}
