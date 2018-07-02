import React from 'react'
import Link from 'gatsby-link'
import { User } from 'react-feather'

import Logo from './Logo'
import Button from './Button'
import NavLink from './NavLink'
import './Nav.css'

export default ({ handlePopupOpen }) => (
  <nav className="Nav">
    <div className="Nav--Container container">
      <Link to="/">
        <Logo />
      </Link>
      <div className="Nav--Container--Links">
        <NavLink to="/about/" exact>
          About
        </NavLink>
        <NavLink to="/learning/" exact>
          Learning
        </NavLink>
        <NavLink to="/centres/" exact>
          Centres
        </NavLink>
        <NavLink to="/enrolments/" exact>
          Enrolments
        </NavLink>
        <NavLink to="/centres/" exact>
          Centres
        </NavLink>
        <NavLink to="/parents/" exact>
          Parents
        </NavLink>
        <NavLink to="/careers/" exact>
          Careers
        </NavLink>
        <NavLink to="/contact/" exact>
          Contact
        </NavLink>
        <div className="Nav--Container--Sep" />
        <NavLink href="/" target="_blank" rel="nofollow" className="primary">
          <User />
          Login
        </NavLink>
        <Button to="/enrol">Enrol Now</Button>
      </div>
    </div>
  </nav>
)
