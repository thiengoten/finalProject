import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  Image,
} from '@nextui-org/react'
import { Icon } from '@iconify/react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getProductById } from '@/services'
import { actions } from '@/store/index'
import { useCartAction } from '@/hooks'

const ProductDetail = () => {
  const { id } = useParams()
  // const stripe = useStripe()
  const [state, dispatch] = useCartAction()
  const { data, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  })

  const handleAddToCart = () => {
    dispatch(actions.addToCart(data))
    // const { data, error } = await supabase.functions.invoke('hello-world', {
    //   body: {
    //     products: [
    //       {
    //         name: 'T-shirt',
    //         price: 2000,
    //         quantity: 1,
    //         image:
    //           'https://zqniiryyuwuamggkxgcf.supabase.co/storage/v1/object/public/products/download.jpg',
    //       },
    //     ],
    //   },
    // })
    // if (data) {
    //   const test = await stripe.redirectToCheckout({
    //     sessionId: data.id,
    //   })
    //   console.log('🚀 ~ handleAddToCart ~ test:', test)
    // }
    // if (error) {
    //   console.error('🚀 ~ handleAddToCart ~ error:', error)
    // }
  }
  return (
    <Card
      isBlurred
      className="container mx-auto mt-6 border-none bg-background/60 dark:bg-default-100/50"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6  justify-center gap-6 md:grid-cols-12 md:gap-4">
          <div className="relative col-span-6 md:col-span-4">
            <Image
              isBlurred
              isLoading={isLoading}
              alt="Album cover"
              className="min-h-[250px] object-cover"
              shadow="md"
              src={data?.imageURL}
              width="100%"
            />
          </div>
          <div className="col-span-6 flex flex-col md:col-span-8">
            <div className="h-full">
              <div className="flex h-full w-full flex-col justify-between">
                <div>
                  <h1 className="text-3xl font-bold">{data?.name}</h1>
                  <h3 className=" mt-3 text-xl font-semibold text-foreground/90">
                    ${`${data?.price}`}.00
                  </h3>
                </div>
                <p className="text-small text-foreground/80">
                  {data?.description}
                </p>
                <Accordion
                  itemClasses={{
                    title: 'font-normal text-foreground/60',
                  }}
                >
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 1"
                    title="Category"
                  >
                    <li>{data?.category}</li>
                  </AccordionItem>
                  <AccordionItem
                    key="2"
                    aria-label="Accordion 2"
                    title="Shipping & Returns"
                  >
                    <li>Free shipping & returns</li>
                    <li>Free, no-hassle returns</li>
                    <li>Complimentary gift packaging</li>
                    <li>Ships within 24 hours!</li>
                  </AccordionItem>
                </Accordion>
                <Button
                  className="w-full text-lg font-medium"
                  size="lg"
                  color="primary"
                  onClick={handleAddToCart}
                >
                  <Icon icon="solar:cart-large-bold" width={24} />
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default ProductDetail
