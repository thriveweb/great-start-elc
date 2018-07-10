import React, { Fragment } from 'react'

import Wave from './Wave'
import './BreakoutBox.css'

export default ({
  title,
  image,
  className = '',
  color = 6,
  noShadow = false,
  children
}) => (
  <div
    className={`BreakoutBox col${color} ${
      noShadow ? '' : 'hasShadow'
    } ${className}`}
  >
    {image && <img src={image} alt={title} className="BreakoutBox--Image" />}
    <div className="BreakoutBox--Content">
      {title && (
        <Fragment>
          <h5>{title}</h5>
          <Wave short />
          <br />
        </Fragment>
      )}
      {children}
    </div>
  </div>
)
