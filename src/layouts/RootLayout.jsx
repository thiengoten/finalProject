import NavBar from '@/components/common/Navbar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="mx-14 min-h-screen max-w-full p-6">
        <Outlet />
      </div>
    </div>
  )
}

export default RootLayout
