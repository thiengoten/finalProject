import { supabase } from '@/config/supabaseClient'
import { getOrdersByUserId } from '@/services'
import { Button, Card, CardBody, Divider } from '@nextui-org/react'
import { useStripe } from '@stripe/react-stripe-js'
import { useQuery } from '@tanstack/react-query'
import { useLoaderData } from 'react-router-dom'

const Orders = () => {
  const userData = useLoaderData()
  const stripe = useStripe()

  const { data } = useQuery({
    queryKey: ['orders'],
    queryFn: () => getOrdersByUserId(userData?.id),
    enabled: !!userData?.id,
  })
  const handleCheckout = async (item, orderID) => {
    console.log('🚀 ~ handleCheckout ~ orderID:', orderID)
    console.log('🚀 ~ handleCheckout ~ item:', item)
    const test = [
      {
        id: item.id,
        name: item.productName,
        price: item.productPrice,
        quantity: item.quantity,
        imageURL: item.productImage,
      },
    ]
    const { data, error } = await supabase.functions.invoke(
      'stripe-stripe-checkout',
      {
        body: {
          products: test,
          orderId: orderID,
        },
      },
    )

    if (data) {
      const test = await stripe.redirectToCheckout({
        sessionId: data.id,
      })
      console.log('🚀 ~ handleAddToCart ~ test:', test)
    }
    if (error) {
      console.error('🚀 ~ handleAddToCart ~ error:', error)
    }
  }
  return (
    <div className="container mx-auto">
      <h1 className="mb-4 mt-8 text-3xl font-bold">Order History</h1>
      {data &&
        data?.map((order) => (
          <Card key={order.id} className="my-4" shadow="sm">
            <CardBody>
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold">
                  {new Date(order.created_at).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </h2>
                <p
                  className={
                    order.status === 'Pending'
                      ? 'text-yellow-400'
                      : 'text-green-400'
                  }
                >
                  {order.status}
                </p>
              </div>

              {order.order_details.map((item, index) => (
                <>
                  <div key={index} className="mt-2 flex justify-between">
                    <div className="flex gap-4">
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="text-lg font-semibold">
                          {item.productName}
                        </h3>
                        <p>x{item.quantity}</p>
                      </div>
                    </div>
                    <p>${item.productPrice}</p>
                  </div>
                  {index < order.order_details.length - 1 && (
                    <Divider className="my-3" />
                  )}
                  <div className="mt-2 flex justify-between">
                    <h3 className="text-lg font-semibold">
                      Total: ${order.total_amount}
                    </h3>
                    {order.status === 'Pending' && (
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => {
                          handleCheckout(item, order.id)
                        }}
                      >
                        Pay Now
                      </Button>
                    )}
                  </div>
                </>
              ))}
            </CardBody>
          </Card>
        ))}
    </div>
  )
}

export default Orders
