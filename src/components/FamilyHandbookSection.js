import React from 'react'

import Button from './Button'
import './FamilyHandbookSection.css'

export default ({ image, ...props }) => (
  <div className="FamilyHandbookSection">
    <div className="FamilyHandbookSection--column section col3">
      <div className="container">
        <div className="FamilyHandbookSection--form">
          <h3>Download Our Family Handbook</h3>
          <Button className="FamilyHandbookSection--Button" to="/">
            Download
          </Button>
        </div>
      </div>
    </div>
    <div className="FamilyHandbookSection--image dark">
      {image && <BackgroundImage src={image} />}
    </div>
  </div>
)
