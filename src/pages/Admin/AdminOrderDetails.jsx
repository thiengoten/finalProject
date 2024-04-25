/* eslint-disable no-extra-semi */
import { getOrderDetailsById } from '@/services'
import { Card } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const AdminOrderDetails = () => {
  const { id } = useParams()
  const { data } = useQuery({
    queryKey: ['order-details', id],
    queryFn: () => getOrderDetailsById(id),
    enabled: !!id,
  })
  console.log('🚀 ~ AdminOrderDetails ~ data:', data)

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Order Details</h2>
      <Card>
        <div className="p-4">
          <h3 className="text-lg font-semibold">Order #1</h3>
          <div className="flex justify-between">
            <p>Order Date: 2021-09-01</p>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Order Items</h3>
            {data?.map((item) => (
              <div key={item.id} className="my-2 flex justify-between">
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
                    <p className="text-default-500">x{item.quantity}</p>
                  </div>
                </div>
                <p className="text-lg font-bold">${item.productPrice}</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Total</h3>
            <h1 className="text-xl font-black">
              $
              {data?.reduce(
                (acc, item) => acc + item.productPrice * item.quantity,
                0,
              )}
            </h1>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default AdminOrderDetails
