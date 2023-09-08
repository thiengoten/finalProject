import NavBar from '@/components/common/Navbar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="mx-14 h-full max-w-full">
        <Outlet />
      </div>
    </div>
  )
}

export default RootLayout
