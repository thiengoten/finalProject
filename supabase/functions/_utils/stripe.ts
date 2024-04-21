import Stripe from 'npm:stripe'

export const stripe = Stripe(Deno.env.get('STRIPE_SECRET')!, {
  httpClient: Stripe.createFetchHttpClient(),
})
