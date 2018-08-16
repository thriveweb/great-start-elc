import React from 'react'
import { stringify } from 'qs'
import { serialize } from 'dom-form-serializer'
import Image from './Image'

import './EnquiryForm.css'

import Form from './DownloadForm2'

class DownloadBanner extends React.Component {
  state = {}
    
  renderOption = (name, value) => {
    return <label className="checkbox-container" key={value}>
      <input 
        className="EnquiryForm--Input" 
        type="radio" 
        name={name}
        value={value}
        onChange={e => this.setState({activeCentre: e.target.value})}
      /> 
      {value}
      <span className='checkbox'></span>
    </label>
  }

  render() {
    const { name, subject, action } = this.props
    const { activeCentre = 'East Malvern', yourname = '', emailaddress = '' } = this.state

    const centres = ['East Malvern', 'Mildura', 'Mildura Central']

    return (
      <section className='download-banner'>
        <Image background src='/images/uploads/handbook.jpg' alt='image of handbook' />
        {centres.map(centre => 
          <Form
            active={activeCentre === centre}
            formName={centre}
            handleChange={e => this.setState({ [e.target.name]: e.target.value })}
            yourname={yourname}
            emailaddress={emailaddress}
          /> 
        )}
        <div className='EnquiryForm--Label label-text'>
          <p>Choose Centre:</p>
          {[ 
            this.renderOption('centre', 'East Malvern'),
            this.renderOption('centre', 'Mildura'),
            this.renderOption('centre', 'Mildura Central')
          ]}
        </div>
      </section>  
    )
  }
}

export default DownloadBanner
