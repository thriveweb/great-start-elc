import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

import Content from './Content'
import BackgroundImage from './BackgroundImage'
import Button from './Button'
import './PageHeader.css'

const PageHeader = ({
  title,
  subtitle,
  backgroundImage,
  large,
  className = ''
}) => {
  if (large) className += ' PageHeader-large'
  return (
    <div className={`PageHeader relative ${className}`}>
      {backgroundImage && (
        <BackgroundImage src={backgroundImage} opacity={0.4} />
      )}
      <div className="container relative">
        <div className="PageHeader--Inner">
          <h1 className="PageHeader--Title">{title}</h1>
          {subtitle && (
            <Content className="PageHeader--Subtitle" src={subtitle} />
          )}
          <Button to="/enrol">Enrol Now</Button>
        </div>
      </div>
    </div>
  )
}

PageHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
}

export default PageHeader
