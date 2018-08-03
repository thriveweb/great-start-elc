import React from 'react'

import './PopoutBanner.css'

export default ({ title, image }) => (
  <div className="section PopoutBanner">
    <div className="container PopoutBanner--Container col2-light hasShadow">
      {image && <img src={image} alt={title} className="PopoutBanner--Image" />}
      <div className="PopoutBanner--Content">
        <h5>{title}</h5>
      </div>
    </div>
  </div>
)
