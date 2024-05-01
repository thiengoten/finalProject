// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
/// <reference lib="deno.ns" />
// Setup type definitions for built-in Supabase Runtime APIs
/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

import Stripe from 'https://esm.sh/stripe?target=deno'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.33.1'

const stripe = Stripe(Deno.env.get('STRIPE_KEY')!, {
  apiVersion: '2024-04-10',
  httpClient: Stripe.createFetchHttpClient(),
})

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
)
const cryptoProvider = Stripe.createSubtleCryptoProvider()

Deno.serve(async (req) => {
  const signature = req.headers.get('Stripe-Signature')
  const body = await req.text()
  let event
  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature!,
      Deno.env.get('STRIPE_WEBHOOK_SECRET')!,
      undefined,
      cryptoProvider,
    )
  } catch (error) {
    return new Response(JSON.stringify(`Webhook Error: ${error}`), {
      status: 400,
    })
  }
  console.log('🚀 ~ Deno.serve ~ event:', event)
  //TODO: Lấy thông tin user từ metadata của session và thêm vào orders và deploys
  switch (event.type) {
    // deno-lint-ignore no-case-declarations
    case 'checkout.session.completed':
      const { data, error } = await supabase
        .from('orders')
        .update({
          status: 'Paid',
        })
        .match({ id: event.data.object.metadata.orderID })
      if (error) {
        console.log('🚀 ~ error ~ error', error)
      }
      break
    case 'payment_intent.succeeded':
      break
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  return new Response(
    JSON.stringify({
      ok: true,
    }),
    {
      headers: { 'Content-Type': 'application/json' },
    },
  )
})
