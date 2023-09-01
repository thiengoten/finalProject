import RootLayout from '@/layouts/RootLayout'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import { navbarLoader } from '@/utils/loaders/routerLoader'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />} loader={navbarLoader}>
        <Route index element={<Home />} />
        <Route path="features" element={<div>Features</div>} />
        <Route path="about" element={<div>About</div>} />
        <Route path="integrations" element={<div>Integrations</div>} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<div>404</div>} />
    </>,
  ),
)

export default router
