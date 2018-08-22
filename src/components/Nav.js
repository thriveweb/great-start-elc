import React, { Component } from 'react'
import Link from 'gatsby-link'
import { User, Menu, X } from 'react-feather'
import _get from 'lodash/get'
import _kebabCase from 'lodash/kebabCase'

import Logo from './Logo'
import Button from './Button'
import NavLink from './NavLink'

import { ICONArrowDown } from './Icons.js'

import './Nav.css'

export default class Nav extends Component {
  state = {
    active: false,
    menuItemActive: false
  }

  toggleActive = () =>
    this.setState({ 
      active: !this.state.active
    })

  render() {
    const { allPages } = this.props
    const { active, menuItemActive } = this.state

    const getChildPages = parentSlug =>
      allPages.filter(
        page => _get(page, 'fields.slug', '').indexOf(parentSlug) === 0
      )


    const renderChildPageLinks = parentSlug => {
      const childPages = getChildPages(parentSlug)
      if (!childPages.length) return null
        
      return (
        <div className={`SubNav SubNav-${_kebabCase(parentSlug)}`}>
          {getChildPages(parentSlug).map(page => {
            return <NavLink key={page.fields.slug} to={page.fields.slug} exact onClick={this.toggleActive}>
              {page.frontmatter.title}
            </NavLink>
          })}
        </div>
      )
    }

    const NavLinkGroup = ({ to, title, dropdown, ...props }) => (
      <div className={`NavLinkGroup ${menuItemActive === dropdown ? 'menu-active' : ''}`}>
        <li className='NavLink' to={to} {...props}>
          {title}
        </li>
        {renderChildPageLinks(to)}
        <span 
        className={`MenuToggle`}
        onClick={() => this.setState({ menuItemActive: menuItemActive === dropdown ? false : dropdown })}
        >
          <ICONArrowDown/>
        </span>
      </div>
    )

    return (
      <nav className="Nav">
        <div className="Nav--Container container">
          <Link to="/">
            <Logo />
          </Link>
          <button
            className="Nav--MenuButton Button-blank"
            onClick={this.toggleActive}
          >
            {active ? <X /> : <Menu />}
          </button>
          <div className={`Nav--Container--Links ${active ? 'active' : ''}`}>
            <NavLinkGroup to="/about/" title="About" dropdown="1" />
            <NavLinkGroup to="/learning/" title="Learning" dropdown="2" />
            <NavLinkGroup to="/centres/" title="Centres" dropdown="3" />
            <NavLinkGroup to="/enrolments/" title="Enrolments" dropdown="4" />
            <NavLinkGroup to="/parents/" title="Parents" dropdown="5" />
            <NavLinkGroup to="/careers/" title="Careers" dropdown="6" />
            <NavLink to="/contact/">Contact</NavLink>

            <div className="Nav--Container--Sep" />
            <NavLink
              href="https://www.qkenhanced.com.au/webui/Account/Embeddable/?databaseId=5583"
              target="_blank"
              rel="nofollow"
              className="primary"
            >
              <User />
              QK Login
            </NavLink>
            <Button to="/enrolments/enrolling-great-start-early-learing-centre/">Enrol Now</Button>
          </div>
        </div>
      </nav>
    )
  }
}
