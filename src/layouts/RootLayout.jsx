import NavBar from '@/components/common/Navbar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div>
      <NavBar>
        <Outlet />
      </NavBar>
    </div>
  )
}

export default RootLayout
