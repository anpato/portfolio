import React from 'react'
import { NavLink } from 'react-router-dom'
import { FlexLayout, Button } from '../shared'
import { FiMoon as Dark, FiSun as Light } from 'react-icons/fi'
import Logo from '../assets/Logo.svg'
const NavBar = ({ window, darkTheme, setTheme }) => (
  <>
    <FlexLayout className="nav-layout" align="space-between center">
      <img src={Logo} alt="logo" />
      <nav>
        <NavLink exact to="/" activeClassName="nav-active">
          Home
        </NavLink>
        <NavLink exact to="/projects" activeClassName="nav-active">
          Projects
        </NavLink>
        <NavLink exact to="/resume" activeClassName="nav-active">
          Resume
        </NavLink>
      </nav>
    </FlexLayout>
    <Button
      variant="fab"
      onClick={() => setTheme(!darkTheme)}
      className="theme-toggle"
    >
      {darkTheme ? <Light /> : <Dark />}
    </Button>
  </>
)

export default NavBar
