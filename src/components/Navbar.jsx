import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  useDisclosure,
} from '@nextui-org/react'
import { NavLink } from 'react-router-dom'
import LoginModal from './LoginModal'

const NavBar = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <Navbar
      className="
     drop-shadow-lg
    "
    >
      <NavbarBrand>
        <NavLink to="/">KeyCat</NavLink>
      </NavbarBrand>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarItem className="transform transition duration-300 ease-in-out hover:scale-110 hover:text-primary">
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
          <Button color="secondary" variant="solid" onPress={onOpen}>
            Login
          </Button>
          <LoginModal isOpen={isOpen} onOpenChange={onOpenChange} />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default NavBar
