import { supabase } from '@/config/supabaseClient'

const createOrder = async (order, orderDetails) => {
  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert(order)
    .select()
    .single()

  if (orderError) {
    throw orderError
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

  return { orderDetails, orderDetailStatus }
}

const getOrdersByUserId = async (userId) => {
  const { data, error } = await supabase
    .from('orders')
    .select(
      'id, total_amount, status, order_details(id, quantity, products(name, price, imageURL))',
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

const getAllOrders = async () => {
  const { data, error } = await supabase
    .from('orders')
    .select('id, total_amount, status, profiles(email))')

  if (error) {
    throw error
  }

  const flattenedData = data.map(({ profiles, ...order }) => ({
    ...order,
    user: profiles.email,
  }))

  return flattenedData
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

export { createOrder, getOrdersByUserId, getAllOrders, getOrderDetailsById }
