import NavBar from '@/components/Navbar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main className="mx-14 mt-14 min-h-screen max-w-full">
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout
