import { supabase } from '@/config/supabaseClient'
import { ORDER_ITEM_PER_PAGE } from '@/constants'

const createOrder = async (order, orderDetails) => {
  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert(order)
    .select()
    .single()

  if (orderError) {
    return orderError
  }

  const { status: orderDetailStatus, error: orderDetailError } = await supabase
    .from('order_details')
    .insert(
      orderDetails.map(({ id, quantity }) => ({
        order_id: orderData.id,
        product_id: id,
        quantity,
      })),
    )

  if (orderDetailError) {
    return orderDetailError
  }

  return { orderData, orderDetails, orderDetailStatus }
}

const getOrdersByUserId = async (userId) => {
  const { data, error } = await supabase
    .from('orders')
    .select(
      'id, total_amount, status, created_at, order_details(id, quantity, products(name, price, imageURL))',
    )
    .eq('user_id', userId)

  if (error) {
    throw error
  }

  const flattenedData = data.map((order) => ({
    ...order,
    order_details: order.order_details.map((detail) => ({
      id: detail.id,
      quantity: detail.quantity,
      productName: detail.products.name,
      productPrice: detail.products.price,
      productImage: detail.products.imageURL,
    })),
  }))

  return flattenedData
}

const getAllOrders = async (page) => {
  const from = (page - 1) * ORDER_ITEM_PER_PAGE
  const to = page * ORDER_ITEM_PER_PAGE - 1

  const { data, error, count } = await supabase
    .from('orders')
    .select('id, total_amount, status, profiles(email))', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to)

  const total = Math.ceil(count / ORDER_ITEM_PER_PAGE)

  if (error) return error

  const flattenedData = data.map(({ profiles, ...order }) => ({
    ...order,
    user: profiles.email,
  }))

  return {
    result: flattenedData,
    totalPage: total,
  }
}

const getOrderDetailsById = async (orderId) => {
  const { data, error } = await supabase
    .from('order_details')
    .select('id, quantity, products(name, price, imageURL)')
    .eq('order_id', orderId)

  const flattenedData = data.map(({ products, ...order }) => ({
    ...order,
    productName: products.name,
    productPrice: products.price,
    productImage: products.imageURL,
  }))

  if (error) {
    return error
  }

  return flattenedData
}

const deleteOrder = async (orderId) => {
  const { error, status } = await supabase
    .from('orders')
    .delete()
    .eq('id', orderId)

  if (error) {
    return error
  }

  return status
}

export {
  createOrder,
  getOrdersByUserId,
  getAllOrders,
  getOrderDetailsById,
  deleteOrder,
}
