import Sidebar from '@/components/common/Sidebar'
import { Outlet, useLocation } from 'react-router-dom'
const AdminLayout = () => {
  const location = useLocation()
  const isAdminAuthPage = ['/admin/login', '/admin/register'].includes(
    location.pathname,
  )

  return (
    <div className="flex">
      {!isAdminAuthPage && <Sidebar />}
      <div className="min-h-screen flex-1">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout
