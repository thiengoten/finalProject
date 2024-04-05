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
  Switch,
  useDisclosure,
} from '@nextui-org/react'
import { Form, NavLink, useLoaderData, useNavigate } from 'react-router-dom'
import LoginModal from '../auth/LoginModal'
import { supabase } from '@/config/supabaseClient'
import { SunIcon } from '@/assets/SunIcon'
import { MoonIcon } from '@/assets/MoonIcon'
import { useDarkModeContext } from '@/hooks/useDarkMode'
import { useEffect, useState } from 'react'

const NavBar = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const userData = useLoaderData()
  // const [loading, setLoading] = useState(false)
  // const [userData, setUserData] = useState(null)
  // const navigate = useNavigate()
  const { isDarkMode, toggle } = useDarkModeContext()

  // useEffect(() => {
  //   const test = async () => {
  //     const {
  //       data: { user },
  //     } = await supabase.auth.getUser()

  //     setUserData(user)
  //     setLoading(false)
  //   }
  //   test()
  // }, [loading])

  // const handleLogout = async () => {
  //   if (error) {
  //     console.log(error)
  //   }
  //   setLoading(true)
  //   navigate('/')
  // }

  return (
    <>
      <Navbar className="drop-shadow-lg">
        <NavbarBrand>
          <NavLink to="/">KeyCat</NavLink>
        </NavbarBrand>
        <NavbarContent className="hidden gap-4 sm:flex" justify="center">
          <NavbarItem className="transform transition duration-300 ease-in-out hover:scale-110 hover:text-secondary-300">
            <NavLink to="/chat-meow">Assistant</NavLink>
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
            <Switch
              size="lg"
              color="secondary"
              onChange={toggle}
              thumbIcon={({ className }) =>
                !isDarkMode ? (
                  <SunIcon className={className} />
                ) : (
                  <MoonIcon className={className} />
                )
              }
              isSelected={isDarkMode}
            />
          </NavbarItem>
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
                  >
                    <Form
                      method="post"
                      action="/logout"
                      onSubmit={(e) => {
                        if (!confirm('Are you sure you want to logout?')) {
                          e.preventDefault()
                        }
                      }}
                    >
                      <button type="submit">Logout</button>
                    </Form>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <Button color="secondary" variant="shadow" onPress={onOpen}>
                Login
              </Button>
            )}
            <LoginModal isOpen={isOpen} onOpenChange={onOpenChange} />
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  )
}

export default NavBar
