import React from 'react'

import Button from './Button'
import Wave from './Wave'
import './JoinBanner.css'

export default ({
  buttonLinkTo = '/enrolments/enrolling-great-start-early-learing-centre/',
  buttonTitle = 'Enrol Now',
  title = 'Join Our Community',
  ...props
}) => (
  <div className="col5 JoinBanner">
    <h3 className="JoinBanner--title">{title}</h3>
    <Wave />
    <Button to={buttonLinkTo}>{buttonTitle}</Button>
  </div>
)
