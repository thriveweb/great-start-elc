import React from 'react'
import Link from 'gatsby-link'
import { User } from 'react-feather'
import _get from 'lodash/get'
import _kebabCase from 'lodash/kebabCase'

import Logo from './Logo'
import Button from './Button'
import NavLink from './NavLink'
import './Nav.css'

export default ({ handlePopupOpen }) => (
  <StaticQuery
    render={data => {
      const allPages = data.allPages.edges.map(edge => edge.node)

      const getChildPages = parentSlug =>
        allPages.filter(
          page => _get(page, 'fields.slug', '').indexOf(parentSlug) === 0
        )

      const renderChildPageLinks = parentSlug => {
        const childPages = getChildPages(parentSlug)
        if (!childPages.length) return null
        return (
          <div className={`SubNav SubNav-${_kebabCase(parentSlug)}`}>
            {getChildPages(parentSlug).map(page => (
              <NavLink key={page.fields.slug} to={page.fields.slug} exact>
                {page.frontmatter.title}
              </NavLink>
            ))}
          </div>
        )
      }

      const NavLinkGroup = ({ to, title, ...props }) => (
        <div className="NavLinkGroup">
          <NavLink to={to} {...props}>
            {title}
          </NavLink>
          {renderChildPageLinks(to)}
        </div>
      )

      return (
        <nav className="Nav">
          <div className="Nav--Container container">
            <Link to="/">
              <Logo />
            </Link>
            <div className="Nav--Container--Links">
              <NavLinkGroup to="/about/" title="About" />
              <NavLinkGroup to="/learning/" title="Learning" />
              <NavLinkGroup to="/centres/" title="Centres" />
              <NavLinkGroup to="/enrolments/" title="Enrolments" />
              <NavLinkGroup to="/parents/" title="Parents" />
              <NavLinkGroup to="/careers/" title="Careers" />
              <NavLink to="/contact/">Contact</NavLink>

              <div className="Nav--Container--Sep" />
              <NavLink
                href="/"
                target="_blank"
                rel="nofollow"
                className="primary"
              >
                <User />
                Login
              </NavLink>
              <Button to="/enrol">Enrol Now</Button>
            </div>
          </div>
        </nav>
      )
    }}
    query={graphql`
      query NavQuery {
        allPages: allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `}
  />
)
