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
              const activeClass = isActive ? 'bg-gray-700 text-white' : ''
              return `rounded-lg p-4 hover:bg-gray-700 ${activeClass} mb-2 block text-default-400 hover:text-white`
            }}
          >
            User Order
          </NavLink>
        </li>
        <li>
          <NavLink
            to={'products'}
            className={({ isActive }) => {
              const activeClass = isActive ? 'bg-gray-700  text-white' : ''
              return `rounded-lg p-4 hover:bg-gray-700 ${activeClass} mb-2 block text-default-400 hover:text-white`
            }}
          >
            Products
          </NavLink>
        </li>
        <li className="rounded-lg p-4 hover:bg-gray-700">
          <a href="#" className="block text-gray-200 hover:text-white">
            Settings
          </a>
        </li>
        <li className="rounded-lg p-4 hover:bg-gray-700">
          <a href="#" className="block text-gray-200 hover:text-white">
            Logout
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
