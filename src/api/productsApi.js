import { supabase } from '@/config/db/supabaseClient'

export const getAllProducts = async () => {
  const { data, error } = await supabase.from('products').select()

  if (error) throw error
  return data
}
