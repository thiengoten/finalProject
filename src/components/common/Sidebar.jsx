import { Icon } from '@iconify/react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="lg:w-55 flex flex-col bg-[#313135] text-gray-100 xl:w-60">
      <div className="flex flex-col items-center p-4">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <p className="mt-2 text-sm">Welcome, Admin!</p>
      </div>
      <ul className="mt-4 flex-1 px-3 py-4">
        <li>
          <NavLink
            to={'user-orders'}
            className={({ isActive }) => {
              const activeClass = isActive
                ? ' bg-slate-200 font-medium text-gray-700'
                : ''
              const hoverClass = isActive
                ? 'hover:bg-slate-200'
                : 'hover:bg-zinc-700'
              return `rounded-xl p-3 ${activeClass} ${hoverClass} mb-2  block text-sm text-default-500`
            }}
          >
            User Order
          </NavLink>
        </li>
        <li>
          <NavLink
            to={'products'}
            className={({ isActive }) => {
              const activeClass = isActive
                ? ' bg-slate-200 font-medium text-gray-700'
                : ''
              const hoverClass = isActive
                ? 'hover:bg-slate-200'
                : 'hover:bg-zinc-700'
              return `rounded-xl p-3 ${activeClass} ${hoverClass} mb-2  block text-sm text-default-500`
            }}
          >
            Products
          </NavLink>
        </li>
        <li>
          <NavLink
            to={'users'}
            className={({ isActive }) => {
              const activeClass = isActive
                ? ' bg-slate-200 font-medium text-gray-700'
                : ''
              const hoverClass = isActive
                ? 'hover:bg-slate-200'
                : 'hover:bg-zinc-700'
              return `rounded-xl p-3 ${activeClass} ${hoverClass} mb-2  block text-sm text-default-500`
            }}
          >
            Users
          </NavLink>
        </li>
        <li className="rounded-lg p-4 hover:bg-gray-700">
          <a href="#" className="block text-sm text-gray-200 hover:text-white">
            Logout
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
