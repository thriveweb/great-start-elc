import React from 'react'
import { serialize } from 'dom-form-serializer'

import { ICONUpload } from './Icons'
import './EnquiryForm.css'

// const fetch = window.fetch

import Select from './Select'

class Form extends React.Component {
  static defaultProps = {
    name: 'Application Form',
    subject: '', // optional subject of the notification email
    action: '',
    hidden: false,
    successMessage: 'Thanks for your submission, we will get back to you soon',
    errorMessage:
      'There is a problem, your message has not been sent, please try contacting us via email'
  }

  state = {
    alert: '',
    disabled: false
  }

  handleUpload = (event, target) => {
    const fileNames = []

    const file = event.target.files
      ? Array.from(event.target.files).forEach(file => {
        fileNames.push(file.name)
      })
      : this.state[target]

    this.setState({
      [target]: !!fileNames.length ? fileNames.join(', ') : file
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const formTarget = e.target

    if (this.state.disabled) return
    const form = e.target
    const data = serialize(form)

    if (!data['resume']) {
      return this.setState({
        alert: 'Please attach Resume'
      })
    } else {
      this.setState({ 
        filesUploading: true 
      }, () => {
        formTarget.submit()
      })
    }
  }

  render () {
    const { name, subject, action, hidden } = this.props
    const { filesUploading } = this.state


    return (
      <form
        className='ApplicationForm EnquiryForm-controlled'
        name={this.state['form-name']}
        ref={form => {
          this.form = form
        }}
        action={this.state.action}
        onSubmit={this.handleSubmit}
        data-netlify=''
        data-netlify-honeypot='_gotcha'
      >
        {this.state.alert && (
          <div className='EnquiryForm--Alert'>{this.state.alert}</div>
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
          name='type'
          options={[
            'Preferred Centre',
            'Mildura Early Learning Centre',
            'Mildura Central Early Learning Centre',
            'East Malvern Learning Centre'
          ]}
        />



        <label className="EnquiryForm--Label has-arrow custom-select">
          <select
            className="EnquiryForm--Input EnquiryForm--Select"
            name="type"
            defaultValue="Preferred Centre"
            required
          >
            <option disabled hidden>
              Preferred Centre
            </option>
            <option>Mildura Early Learning Centre</option>
            <option>Mildura Central Early Learning Centre</option>
            <option>East Malvern Learning Centre</option>
          </select>
        </label>
        <label className="EnquiryForm--Label has-arrow custom-select">
          <select
            className="EnquiryForm--Input EnquiryForm--Select"
            name="type"
            defaultValue="Joining as"
            required
          >
            <option disabled hidden>
              Joining as
            </option>
            <option>option 1</option>
            <option>option 2</option>
            <option>option 3</option>
          </select>
        </label>
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

        <div className='form--footer'>
          <input type='text' name='_gotcha' style={{ display: 'none' }} />
          {!!subject && <input type='hidden' name='subject' value={subject} />}
          <input type='hidden' name='form-name' value={name} />
          <input
            className='Button hasShadowHover EnquiryForm--SubmitButton'
            type='submit'
            value={!filesUploading ? 'Apply Now' : 'Uploading Files...'}
          />
        </div>
      </form>
    )
  }
}

export default Form
