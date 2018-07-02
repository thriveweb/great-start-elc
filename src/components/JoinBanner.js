import React from 'react'

import Button from './Button'
import Wave from './Wave'
import './JoinBanner.css'

export default ({ linkTo = '/', ...props }) => (
  <div className="col5 JoinBanner">
    <h3 className="JoinBanner--title">Join Our Community</h3>
    <Wave />
    <Button to={linkTo}>Enrol Now</Button>
  </div>
)
