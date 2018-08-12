import React from 'react'
import { stringify } from 'qs'
import { serialize } from 'dom-form-serializer'
import Select from './Select'
import { ICONUpload } from './Icons'

import './EnquiryForm.css'

class Application extends React.Component {
  static defaultProps = {
    name: 'Application',
    subject: '', // optional subject of the notification email
    action: '',
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


  // handleSubmit = e => {
  //   e.preventDefault()
  //   if (this.state.disabled) return

  //   const form = e.target
  //   const data = serialize(form)

  //   console.log('new one')
  //   console.log(data)

  //   this.setState({ disabled: true })
  //   fetch(form.action + '?' + stringify(data), {
  //     method: 'POST'
  //   })
  //   .then(res => {
  //     if (res.ok) {
  //       return res
  //     } else {
  //       throw new Error('Network error')
  //     }
  //   })
  //   .then(() => {
  //     form.reset()
  //     this.setState({
  //       alert: this.props.successMessage,
  //       disabled: false
  //     })
  //   })
  //   .catch(err => {
  //     console.error(err)
  //     this.setState({
  //       disabled: false,
  //       alert: this.props.errorMessage
  //     })
  //   })
  // }


   handleSubmit = e => {
    e.preventDefault()
    const formTarget = e.target

    console.log('eeee')

    if (this.state.disabled) return
    const form = e.target
    const data = serialize(form)

    this.setState({ 
      filesUploading: true 
    }, () => {
      formTarget.submit()
    })
  }

  render() {
    const { name, subject, action } = this.props

    return (
      <form
        className="ApplicationForm"
        name={name}
        action={action}
        method='post'
        onSubmit={this.handleSubmit}
        data-netlify=""
        data-netlify-honeypot="email"
        encType='multipart/form-data'
        netlify
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
            required
          />
        </label>
        <label className="EnquiryForm--Label">
          <input
            className="EnquiryForm--Input"
            type="email"
            placeholder="Email"
            name="e-mail"
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
          name='centre'
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
        <label className="EnquiryForm--Label full-width word-wrap">
          <input
            className="EnquiryForm--Input"
            type="text"
            placeholder="Why do you want to work for Great Start?"
            name="message"
            required
          />
        </label>
        <div className='file-download'>
          <div className='file-download-item'>
            <label className='EnquiryForm--Label title'>
              <input
                className='EnquiryForm--Input'
                type='file'
                placeholder='Resume and Cover Letter'
                name='resume'
                onChange={event => this.handleUpload(event, 'resume')}
              />
              Resume and Cover Letter <ICONUpload/>
            </label>
            {this.state.resume && <p className='results'>{this.state.resume}</p>}
          </div>
        </div>
        <input type="text" name="_gotcha" style={{ display: 'none' }} />
        {!!subject && <input type="hidden" name="subject" value={subject} />}
        <input type="hidden" name="form-name" value={name} />
        <input
          className="Button hasShadowHover EnquiryForm--SubmitButton"
          type="submit"
          value="Submit"
          disabled={this.state.disabled}
        />
      </form>
    )
  }
}

export default Application
