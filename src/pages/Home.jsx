import { getAllProducts } from '@/api'
import ProductCard from '@/components/products/ProductCard'
import { useQuery } from '@tanstack/react-query'

const Home = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  })
  console.log('🚀 ~ file: Home.jsx:10 ~ Home ~ data:', data)
  return (
    <div className="grid grid-cols-2 gap-unit-lg sm:grid-cols-3 lg:grid-cols-6">
      {data &&
        data.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
    </div>
  )
}

export default Home
