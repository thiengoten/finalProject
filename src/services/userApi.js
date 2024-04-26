import { supabase } from '@/config/supabaseClient'
import { USER_ITEM_PER_PAGE } from '@/constants'

export const getProfiles = async (page) => {
  const from = (page - 1) * USER_ITEM_PER_PAGE
  const to = page * USER_ITEM_PER_PAGE - 1
  const { data, error, count } = await supabase
    .from('profiles')
    .select('id, full_name, email', { count: 'exact' })
    .range(from, to)

  const total = Math.ceil(count / USER_ITEM_PER_PAGE)

  if (error) return error
  return {
    result: data,
    totalPage: total,
  }
}
