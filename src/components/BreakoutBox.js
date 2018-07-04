import React, { Fragment } from 'react'

import Button from './Button'
import Wave from './Wave'
import './BreakoutBox.css'

export default ({ title, image, className = '', children }) => (
  <div className={`BreakoutBox col6 hasShadow ${className}`}>
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
