import { paginateProducts } from '@/services'
import ProductCard from '@/components/products/ProductCard'
import { Pagination } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

const Home = () => {
  const [page, setPage] = useState(1)

  const { data, isLoading } = useQuery(
    ['products', page],
    () => paginateProducts(page),
    {
      keepPreviousData: true,
      staleTime: 1000 * 20,
    },
  )

  const { result, totalPage } = !!data && data

  return (
    <>
      <h1 className="my-6 text-2xl font-semibold">Products</h1>
      <div className="grid grid-cols-2 gap-unit-lg sm:grid-cols-3 lg:grid-cols-4">
        {result?.map((product, index) => (
          <ProductCard key={index} product={product} isLoading={isLoading} />
        ))}
      </div>
      {totalPage >= 1 && (
        <Pagination
          className="mt-6 flex justify-center p-6"
          color="primary"
          showControls
          total={totalPage}
          initialPage={1}
          onChange={(page) => {
            setPage(page)
          }}
        />
      )}
    </>
  )
}

export default Home
