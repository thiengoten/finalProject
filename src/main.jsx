import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import { CartActionProvider, DarkModeProvider } from './contexts/index.js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Elements } from '@stripe/react-stripe-js'
import { stripePromise } from './config/stripeClient.js'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})
const options = {
  appearance: {
    theme: 'flat',
  },
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <NextUIProvider>
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <CartActionProvider>
          <Elements stripe={stripePromise} options={options}>
            <App />
          </Elements>
        </CartActionProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </DarkModeProvider>
  </NextUIProvider>,
)
