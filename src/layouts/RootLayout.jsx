import NavBar from '@/components/Navbar'
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
