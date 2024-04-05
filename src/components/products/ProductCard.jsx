import { Card, CardBody, CardFooter, Image, Skeleton } from '@nextui-org/react'

const ProductCard = ({ product, isLoading }) => {
  return (
    <Card
      className="max-w-[300px]"
      shadow="sm"
      isPressable
      // onPress={() => console.log(product.title)}
    >
      <CardBody className="overflow-visible p-0">
        <Image
          isZoomed
          shadow="sm"
          radius="lg"
          width="100%"
          alt={product.name}
          className="max-h-[300px] min-h-[140px] w-full object-cover"
          src={`https://app.requestly.io/delay/2000/${product.imageURL}`}
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
