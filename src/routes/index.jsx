import AdminLayout from '@/layouts/AdminLayout'
import RootLayout from '@/layouts/RootLayout'
import AddProduct from '@/pages/Admin/AddProduct'

import AdminProduct from '@/pages/Admin/AdminProduct'
import Chat from '@/pages/Chat'
import Home from '@/pages/Home'
import ProductCheckout from '@/pages/Products/ProductCheckout'
import ProductDetail from '@/pages/Products/ProductDetail'
import SignUp from '@/pages/SignUp'
import { navbarLoader } from '@/utils/loaders'
import { logoutAction } from '@/utils/logout'
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
        <Route path="chat-meow" element={<Chat />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="products/checkout" element={<ProductCheckout />} />
        <Route path="about" element={<div>About</div>} />
        <Route path="integrations" element={<div>Integrations</div>} />
        <Route path="logout" action={logoutAction} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="products" element={<AdminProduct />} />
        <Route path="products/new" element={<AddProduct />} />
        <Route path="products/:id" element={<AddProduct />} />
        <Route path="dash-board" element={<div>Hello</div>} />
        <Route path="users" element={<div>Users</div>} />
        <Route path="orders" element={<div>Orders</div>} />
      </Route>
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="*" element={<div>404</div>} />
    </>,
  ),
)

export default router
