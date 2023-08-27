import RootLayout from '@/layouts/RootLayout'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<RootLayout />} />)
)

export default router
