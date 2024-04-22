// import { stripePromise } from '@/config/stripeClient'
// import { Elements } from '@stripe/react-stripe-js'

const ProductCheckout = () => {
  const products = [
    { name: 'Product A', price: 20.0, quantity: 2 },
    { name: 'Product B', price: 15.0, quantity: 1 },
    // Add more products here
  ]

  return (
    <div className="container mx-auto mt-8">
      <h2 className="mb-4 text-2xl font-bold">Your Cart</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="border-b border-gray-400 px-4 py-2">Product Name</th>
            <th className="border-b border-gray-400 px-4 py-2">Price</th>
            <th className="border-b border-gray-400 px-4 py-2">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td className="border-b border-gray-400 px-4 py-2">
                {product.name}
              </td>
              <td className="border-b border-gray-400 px-4 py-2">
                ${product.price.toFixed(2)}
              </td>
              <td className="border-b border-gray-400 px-4 py-2">
                {product.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="mt-4 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:bg-green-600 focus:outline-none">
        Checkout
      </button>
    </div>
  )
}

export default ProductCheckout
