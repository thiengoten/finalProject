import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react'
import { NavLink } from 'react-router-dom'

const NavbarC = () => {
  return (
    <Navbar>
      <NavbarBrand>
        <p>KeyCat</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem
          className="
          hover:text-primary
          transition
          duration-300
          ease-in-out
          transform
          hover:scale-110
        "
        >
          <NavLink to="/features">Features</NavLink>
        </NavbarItem>
        <NavbarItem
          className="
          hover:text-primary
          transition
          duration-300
          ease-in-out
          transform
          hover:scale-110
        "
        >
          <NavLink to="/about">About</NavLink>
        </NavbarItem>
        <NavbarItem
          className="
          hover:text-primary
          transition
          duration-300
          ease-in-out
          transform
          hover:scale-110
        "
        >
          <NavLink to="integrations">Integrations</NavLink>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button color="secondary" variant="shadow">
            <NavLink to="login">Login</NavLink>
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default NavbarC
