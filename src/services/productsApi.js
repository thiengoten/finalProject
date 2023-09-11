import { supabase } from '@/config/supabaseClient'
import { ITEMS_PER_PAGE } from '@/constants'

export const getAllProducts = async () => {
  const { data, error } = await supabase.from('products').select()

  if (error) throw error
  return data
}

export const paginateProducts = async (page) => {
  const from = (page - 1) * ITEMS_PER_PAGE
  const to = page * ITEMS_PER_PAGE - 1
  const { data, count, error } = await supabase
    .from('products')
    .select('*', { count: 'exact' })
    .range(from, to)

  const total = Math.ceil(count / ITEMS_PER_PAGE)

  if (error) throw error
  return {
    result: data,
    totalPage: total,
  }
}
