import Sidebar from '@/components/common/Sidebar'
import { Outlet } from 'react-router-dom'
const AdminLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="min-h-screen flex-1">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout
