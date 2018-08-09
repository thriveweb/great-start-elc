import React from 'react'
import { stringify } from 'qs'
import { serialize } from 'dom-form-serializer'
import Image from './Image'

import Select from './Select'
import { ICONUpload } from './Icons'

import './EnquiryForm.css'

class Form extends React.Component {
  static defaultProps = {
    name: 'Application Form',
    subject: '', // optional subject of the notification email
    action: '',
    successMessage: 'Thanks for your enquiry, we will get back to you soon',
    errorMessage:
      'There is a problem, your message has not been sent, please try contacting us via email'
  }

  state = {
    alert: '',
    disabled: false
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.disabled) return

    const form = e.target
    const data = serialize(form)
    this.setState({ disabled: true })
    fetch(form.action + '?' + stringify(data), {
      method: 'POST'
    })
      .then(res => {
        if (res.ok) {
          return res
        } else {
          throw new Error('Network error')
        }
      })
      .then(() => {
        form.reset()
        this.setState({
          alert: this.props.successMessage,
          disabled: false
        })
      })
      .catch(err => {
        console.error(err)
        this.setState({
          disabled: false,
          alert: this.props.errorMessage
        })
      })
  }

  renderOption = (name, value) => {
    return <label className="checkbox-container">
      <input 
        className="EnquiryForm--Input" 
        type="radio" 
        name={name}
        value={value}
      /> 
      {value}
      <span className='checkbox'></span>
    </label>
  }

  render() {
    const { name, subject, action } = this.props

    return (
      <section>
        <form
          className="ApplicationForm"
          name={name}
          action={action}
          onSubmit={this.handleSubmit}
          data-netlify=""
          data-netlify-honeypot="email"
        >
          {this.state.alert && (
            <div className="EnquiryForm--Alert">{this.state.alert}</div>
          )}


        
        <label className="EnquiryForm--Label">
          <input
            className="EnquiryForm--Input"
            type="text"
            placeholder="Your Name"
            name="name"
            required
          />
        </label>
        <label className="EnquiryForm--Label">
          <input
            className="EnquiryForm--Input"
            type="text"
            placeholder="Phone"
            name="phone"
          />
        </label>
        <label className="EnquiryForm--Label">
          <input
            className="EnquiryForm--Input"
            type="email"
            placeholder="Email"
            name="email"
            required
          />
        </label>
        <label className="EnquiryForm--Label">
          <input
            className="EnquiryForm--Input"
            type="text"
            placeholder="Preferred Role"
            name="role"
            required
          />
        </label>
        <Select
          placeholder='Preferred Centre'
          name='type'
          options={[
            'Mildura Early Learning Centre',
            'Mildura Central Early Learning Centre',
            'East Malvern Learning Centre'
          ]}
        />
        <Select
        placeholder='Joining as'
          name='type'
          options={[
            'option 1',
            'option 2',
            'option 3'
          ]}
        />
        <label className="EnquiryForm--Label full-width">
          <input
            className="EnquiryForm--Input"
            type="text"
            placeholder="Qualifications"
            name="qualifications"
            required
          />
        </label>
        <label className="EnquiryForm--Label full-width">
          <input
            className="EnquiryForm--Input EnquiryForm--Textarea"
            placeholder="Why do you want to work for Great Start?"
            name="message"
            rows="10"
            required
          />
        </label>
        <input
          className='EnquiryForm--Input'
          type='text'
          name='_gotcha'
          style={{ display: 'none' }}
          value={this.state._gotcha}
          onChange={this.handleChange}
        />
        <input
          className='EnquiryForm--Input'
          type='hidden'
          name='subject'
          value={this.state.subject}
        />
        <input
          className='EnquiryForm--Input'
          type='hidden'
          name='form-name'
          value={this.state['form-name']}
        />
        <div className='file-download'>
          <div className='file-download-item'>
            <label className='EnquiryForm--Label title'>
              <input
                className='EnquiryForm--Input'
                type='file'
                placeholder='Resume and Cover Letter'
                name='resume'
                onChange={event => this.handleUpload(event, 'resume')}
                multiple
              />
              Resume and Cover Letter <ICONUpload/>
            </label>
            {this.state.resume && <p className='results'>{this.state.resume}</p>}
          </div>
        </div>

        {this.state.alert && (
          <div className='EnquiryForm--Alert'>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='feather feather-alert-triangle'
            >
              <path d='M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z' />
              <line x1='12' y1='9' x2='12' y2='13' />
              <line x1='12' y1='17' x2='12' y2='17' />
            </svg>
            {this.state.alert}
          </div>
        )}


          <input type="text" name="_gotcha" style={{ display: 'none' }} />
          {!!subject && <input type="hidden" name="subject" value={subject} />}
          <input type="hidden" name="form-name" value={name} />
            <input
              className="Button hasShadowHover EnquiryForm--SubmitButton"
              type="submit"
              value="Download"
              disabled={this.state.disabled}
            />
        </form>
      </section>  
    )
  }
}

export default Form
