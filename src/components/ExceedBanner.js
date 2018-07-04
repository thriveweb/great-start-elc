import React from 'react'

import Button from './Button'
import PopoutBanner from './PopoutBanner'
import './ExceedBanner.css'

export default ({ image, title, longText, showExceedBannerLong, ...props }) =>
  showExceedBannerLong ? (
    <PopoutBanner image={image} title={longText} />
  ) : (
    <div className="ExceedBanner">
      {image && <img className="ExceedBanner--image" src={image} alt={title} />}
      <h3 className="ExceedBanner--title">{title}</h3>
    </div>
  )
