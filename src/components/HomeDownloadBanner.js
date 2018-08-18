import React from 'react'
import { stringify } from 'qs'
import { serialize } from 'dom-form-serializer'
import Image from './Image'

import Form from './DownloadForm'

import './DownloadForm.css'

class HomeForm extends React.Component {
  state = {
    fields: {
      centre: 'East Malvern'
    } 
  }

  handleChange = e => {
    e.persist()
    this.setState(prevState => {
      return {
        fields: {
          ...prevState.fields,
          [e.target.name]: e.target.value
        }
      }
    })
  }

  render() {
    const { name, subject, action } = this.props

    const centres = ['East Malvern', 'Mildura', 'Mildura Central']

    const { fields } = this.state
    const { centre } = fields

    const title = 'Download Our Family Handbook'
    const description = 'Fill out the form and download our family handbook or contact us 123 456 789'

    return (
      <section className='download-banner home-download'>
        <div className='container'>
          {centres.map((centreItem, index) => 
            <Form
              key={`Home Download ${index}`}
              active={centre === centreItem}
              formName={centreItem}
              fields={fields}
              handleChange={this.handleChange}
              title={title}
              description={description}
            /> 
          )}
        </div>  
        <Image background src='/images/uploads/handbook.jpg' alt='image of handbook' />
      </section>  
    )
  }
}

export default HomeForm
