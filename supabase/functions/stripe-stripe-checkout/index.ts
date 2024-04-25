// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
/// <reference lib="deno.ns" />
import { corsHeaders } from '../_shared/cors.ts'
import Stripe from 'https://esm.sh/stripe?target=deno'

// Setup type definitions for built-in Supabase Runtime APIs
/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

const stripe = Stripe(Deno.env.get('STRIPE_KEY')!, {
  apiVersion: '2024-04-10',
  httpClient: Stripe.createFetchHttpClient(),
})
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { products } = await req.json()
    const token = req.headers.get('Authorization')!.replace('Bearer ', '')
    console.log('🚀 ~ token ~ token:', token)
    if (!token) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 401,
      })
    }

    const lineItems = products.map((product: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.name,
          images: [product.imageURL],
        },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity,
    }))
    const metaData = products.map((product: any) => ({
      productId: product.id,
      quantity: product.quantity,
    }))
    console.log('🚀 ~ metaData ~ metaData:', metaData)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      phone_number_collection: {
        enabled: false,
      },
      metadata: {
        products: JSON.stringify(metaData),
      },
      success_url:
        'https://remix-cloudflare-workers.jonmeyers.workers.dev/success',
      cancel_url:
        'https://remix-cloudflare-workers.jonmeyers.workers.dev/cancel',
    })

    return new Response(
      JSON.stringify({
        id: session.id,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/stripe-stripe-checkout' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
