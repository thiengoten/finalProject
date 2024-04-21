import { Button } from '@nextui-org/react'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'

const CheckoutForm = () => {
  // const stripe = useStripe()
  // stripe.redirectToCheckout({ sessionId: 'cs_test_a1c2e3d4e5f6g7h8i9j0' })
  // const elements = useElements()
  // const handleSubmit = async (event) => {
  //   event.preventDefault()
  //   // const { error, paymentMethod } = await stripe.createPaymentMethod({
  //   //   type: 'card',
  //   //   card: elements.getElement(PaymentElement),
  //   // })
  //   // if (error) {
  //   //   console.log('[error]', error)
  //   // } else {
  //   //   console.log('[PaymentMethod]', paymentMethod)
  //   // }
  //   if (!stripe || !elements) {
  //     // Stripe.js hasn't yet loaded.
  //     // Make sure to disable form submission until Stripe.js has loaded.
  //     return
  //   }
  //   const result = await stripe.confirmPayment({
  //     //`Elements` instance that was used to create the Payment Element
  //     elements,
  //     confirmParams: {
  //       return_url: 'https://example.com/order/123/complete',
  //     },
  //   })
  //   console.log(result)
  // }
  return (
    <form>
      {/* <PaymentElement />
      <Button type="submit" color="success" disabled={!stripe}>
        Pay
      </Button> */}
    </form>
  )
}

export default CheckoutForm
