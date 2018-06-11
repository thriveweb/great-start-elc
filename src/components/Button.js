import React from 'react'
import Link from 'gatsby-link'

import './Button.css'

export default ({
  className = '',
  to,
  href,
  children,
  hasShadow = true,
  ...props
}) => {
  if (hasShadow) className += ' hasShadowHover'
  return (
    <Link to={to} className={`Button ${className}`} {...props}>
      {children}
    </Link>
  )
}
