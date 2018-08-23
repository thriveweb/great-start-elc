import React from 'react'

import Button from './Button'
import Wave from './Wave'
import './JoinBanner.css'

export default ({
  buttonLinkTo = '/careers/employment-opportunities/',
  buttonTitle = 'Join Now',
  title = 'Join Our Team',
  ...props
}) => (
  <div className="col5 JoinBanner">
    <h3 className="JoinBanner--title">{title}</h3>
    <Wave />
    <Button to={buttonLinkTo}>{buttonTitle}</Button>
  </div>
)
