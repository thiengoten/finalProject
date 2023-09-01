import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  useDisclosure,
} from '@nextui-org/react'
import { NavLink, useLoaderData, useNavigate } from 'react-router-dom'
import LoginModal from './LoginModal'
import { supabase } from '@/config/db/supabaseClient'

const NavBar = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const userData = useLoaderData()

  const navigate = useNavigate()

  const handleLogout = async () => {
    let { error } = await supabase.auth.signOut()
    if (error) {
      console.log(error)
    }

    navigate('/')
  }

  return (
    <Navbar className="drop-shadow-lg">
      <NavbarBrand>
        <NavLink to="/">KeyCat</NavLink>
      </NavbarBrand>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarItem className="transform transition duration-300 ease-in-out hover:scale-110 hover:text-secondary-300">
          <NavLink to="/features">Features</NavLink>
        </NavbarItem>
        <NavbarItem className="transform transition duration-300 ease-in-out hover:scale-110 hover:text-primary">
          <NavLink to="/about">About</NavLink>
        </NavbarItem>
        <NavbarItem className="transform transition duration-300 ease-in-out hover:scale-110 hover:text-primary">
          <NavLink to="integrations">Integrations</NavLink>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          {userData ? (
            <Dropdown>
              <DropdownTrigger>
                <Avatar
                  isBordered
                  src={`https://api.dicebear.com/7.x/micah/svg?seed=${userData?.email}`}
                  size="medium"
                  as="button"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="w-40 overflow-hidden overflow-ellipsis whitespace-nowrap font-semibold">
                    {userData?.email}
                  </p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="my_order">My Order</DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  className="text-danger"
                  onClick={handleLogout}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button color="secondary" variant="solid" onPress={onOpen}>
              Login
            </Button>
          )}
          <LoginModal isOpen={isOpen} onOpenChange={onOpenChange} />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default NavBar
