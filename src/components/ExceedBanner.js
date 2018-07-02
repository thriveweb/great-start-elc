import React from 'react'

import Button from './Button'
import './ExceedBanner.css'

export default ({ image, title, ...props }) => (
  <div className="ExceedBanner">
    {image && <img className="ExceedBanner--image" src={image} alt={title} />}
    <h3 className="ExceedBanner--title">{title}</h3>
  </div>
)
