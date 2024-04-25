import { getOrdersByUserId } from '@/services'
import { Card, CardBody, Divider } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { useLoaderData } from 'react-router-dom'

const Orders = () => {
  const userData = useLoaderData()

  const { data } = useQuery({
    queryKey: ['orders'],
    queryFn: () => getOrdersByUserId(userData?.id),
    enabled: !!userData?.id,
  })

  return (
    <div className="container mx-auto">
      <h1 className="mb-4 mt-8 text-3xl font-bold">Order History</h1>
      {data &&
        data?.map((order) => (
          <Card key={order.id} className="my-4" shadow="sm">
            <CardBody>
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold">Order #1</h2>
                {/* <p className="text-gray-600">{order.date}</p> */}
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
                </>
              ))}

              <div className="mt-2 text-right">
                <h3 className="text-lg font-semibold">
                  Total: ${order.total_amount}
                </h3>
              </div>
            </CardBody>
          </Card>
        ))}
    </div>
  )
}

export default Orders
