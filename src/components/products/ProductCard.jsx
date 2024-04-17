import { Card, CardBody, CardFooter, Image, Skeleton } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({ product, isLoading }) => {
  const navigate = useNavigate()
  return (
    <Card
      className="max-w-[300px]"
      shadow="sm"
      isPressable
      onPress={() => navigate(`/products/${product.id}`)}
    >
      <CardBody className="overflow-visible p-0">
        <Image
          isZoomed
          shadow="sm"
          radius="lg"
          width="100%"
          alt={product.name}
          className="max-h-[200px] min-h-[150px] w-full object-cover"
          src="https://app.requestly.io/delay/5000/https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
        />
      </CardBody>
      <CardFooter className="justify-between text-small">
        {isLoading ? (
          <Skeleton className="w-3/5 rounded-lg" />
        ) : (
          <b>{product.name}</b>
        )}

        <p className="text-default-500">${product.price}</p>
      </CardFooter>
    </Card>
  )
}

export default ProductCard
