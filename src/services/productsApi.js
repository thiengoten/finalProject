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
    .order('created_at', { ascending: false })
    .range(from, to)

  const total = Math.ceil(count / ITEMS_PER_PAGE)

  if (error) throw error
  return {
    result: data,
    totalPage: total,
  }
}

export const createProduct = async (product) => {
  const { error, status } = await supabase.from('products').insert(product)
  if (error) throw error
  return status
}

export const getProductById = async (id) => {
  const { data, error } = await supabase
    .from('products')
    .select()
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

export const updateProduct = async (id, product) => {
  const { error, status } = await supabase
    .from('products')
    .update(product)
    .eq('id', id)
  if (error) throw error
  return status
}

export const deleteProduct = async (id) => {
  const { error, status } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  return {
    status,
    error,
  }
}
