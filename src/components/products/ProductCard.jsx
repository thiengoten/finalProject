// ProductCard.jsx
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'

const ProductCard = ({ product }) => {
  return (
    <Card
      className="max-w-[300px]"
      shadow="sm"
      isPressable
      // onPress={() => console.log(product.title)}
    >
      <CardBody className="overflow-visible p-0">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt={product.name}
          className="h-[140px] w-full object-cover"
          src={product.imageURL}
        />
      </CardBody>
      <CardFooter className="justify-between text-small">
        <b>{product.name}</b>
        <p className="text-default-500">${product.price}</p>
      </CardFooter>
    </Card>
  )
}

export default ProductCard
