import AdminLayout from '@/layouts/AdminLayout'
import RootLayout from '@/layouts/RootLayout'
import AddProduct from '@/pages/Admin/AddProduct'
import AdminLogin from '@/pages/Admin/AdminLogin'
import AdminOrder from '@/pages/Admin/AdminOrder'
import AdminOrderDetails from '@/pages/Admin/AdminOrderDetails'

import AdminProduct from '@/pages/Admin/AdminProduct'
import AdminUsers from '@/pages/Admin/AdminUsers'
import UserOrders from '@/pages/Admin/UserOrders'
import Chat from '@/pages/Chat'
import Home from '@/pages/Home'
import Orders from '@/pages/Orders'
import ProductCheckout from '@/pages/Products/ProductCheckout'
import ProductDetail from '@/pages/Products/ProductDetail'
import Profile from '@/pages/Profile'
import SignUp from '@/pages/SignUp'
import { navbarLoader } from '@/utils/loaders'
import { logoutAction } from '@/utils/logout'
import { updateProfileAction } from '@/utils/updateProfile'
import {
  Route,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'

//TODO: Thêm bảo vệ route cho admin và check login
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />} loader={navbarLoader}>
        <Route index element={<Home />} />
        <Route path="chat-meow" element={<Chat />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="products/checkout" element={<ProductCheckout />} />
        <Route path="orders" element={<Orders />} loader={navbarLoader} />
        <Route path="profile" element={<Profile />} loader={navbarLoader} />
        <Route path="about" element={<div>About</div>} />
        <Route path="integrations" element={<div>Integrations</div>} />
        <Route path="logout" action={logoutAction} />
        <Route path="update-profile" action={updateProfileAction} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route
          path="products"
          element={<AdminProduct />}
          loader={navbarLoader}
        />
        <Route path="products/new" element={<AddProduct />} />
        <Route path="products/:id" element={<AddProduct />} />
        <Route path="user-orders" element={<AdminOrder />} />
        <Route path="user-list-order/:id" element={<UserOrders />} />
        <Route path="user-orders/:id" element={<AdminOrderDetails />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="login" element={<AdminLogin />} />
        <Route path="register" element={<AdminLogin />} />
      </Route>
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="*" element={<div>404</div>} />
    </>,
  ),
)

export default router
