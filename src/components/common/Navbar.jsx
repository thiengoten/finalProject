import {
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Switch,
  card,
  useDisclosure,
} from '@nextui-org/react'
import { Form, NavLink, useLoaderData } from 'react-router-dom'
import LoginModal from '../auth/LoginModal'
import { SunIcon } from '@/assets/SunIcon'
import { MoonIcon } from '@/assets/MoonIcon'
import { useDarkModeContext } from '@/hooks/useDarkMode'
import { Icon } from '@iconify/react'
import logo from '@/assets/test.png'
import { useCartAction } from '@/hooks'
import { actions } from '@/store'

const NavBar = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const userData = useLoaderData()
  const { isDarkMode, toggle } = useDarkModeContext()
  const [state, dispatch] = useCartAction()
  console.log('🚀 ~ NavBar ~ state:', state)

  return (
    <>
      <Navbar className="drop-shadow-lg">
        <NavbarBrand>
          <img src={logo} className="h-10 w-10" />
          <NavLink to="/">KeyCat</NavLink>
        </NavbarBrand>
        <NavbarContent className="hidden gap-5 sm:flex" justify="start">
          <NavbarItem className="transform transition duration-300 ease-in-out hover:scale-110 hover:text-secondary-300">
            <NavLink to="/chat-meow">Chat</NavLink>
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
              color="default"
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
              <Button color="primary" variant="shadow" onPress={onOpen}>
                Login
              </Button>
            )}
            <LoginModal isOpen={isOpen} onOpenChange={onOpenChange} />
          </NavbarItem>
          <NavbarItem>
            <Badge content="1" shape="circle" color="danger">
              <Popover placement="bottom-end">
                <PopoverTrigger>
                  <Button
                    radius="full"
                    isIconOnly
                    aria-label="more than 99 notifications"
                    variant="light"
                    className="outline-0"
                  >
                    <Icon icon="solar:cart-large-bold" width={28} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Card shadow="none" className="max-w-[350px] border-none">
                    <CardBody className="justify-between ">
                      {state.carts.length === 0 && (
                        <div className="flex h-32 items-center justify-center">
                          <h1 className="text-lg font-bold text-default-600">
                            Your cart is empty
                          </h1>
                        </div>
                      )}
                      {state?.carts?.map((cart) => (
                        <div
                          className="mb-2 flex justify-between gap-5"
                          key={cart.id}
                        >
                          <Image
                            src={cart.imageURL}
                            alt="product image"
                            width={100}
                            height="auto"
                          />
                          <div className="flex flex-col justify-between">
                            <div className="flex flex-col items-start justify-start">
                              <h4 className="text-smal max-w-[100px]  truncate font-bold leading-none text-default-600 ">
                                {cart.name}
                              </h4>
                              <h5 className="text-small tracking-tight text-default-500 ">
                                {cart.category}
                              </h5>
                            </div>
                            <h4 className="text-base font-bold leading-none text-default-600">
                              ${cart.price}.00
                            </h4>
                          </div>
                          <Button
                            radius="full"
                            size="sm"
                            className="self-center"
                            onClick={() => {
                              dispatch(actions.removeCardItem(cart.id))
                            }}
                            isIconOnly
                            variant="light"
                          >
                            <Icon
                              icon="iconamoon:close-bold"
                              width={24}
                              height={24}
                            />
                          </Button>
                        </div>
                      ))}
                    </CardBody>
                    {state.carts.length > 0 && (
                      <CardFooter>
                        <Button
                          color="primary"
                          className="w-full"
                          variant="flat"
                          disableAnimation
                          disableRipple
                        >
                          Checkout
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                </PopoverContent>
              </Popover>
            </Badge>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  )
}

export default NavBar
