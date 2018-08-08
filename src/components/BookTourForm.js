import React from 'react'
import { stringify } from 'qs'
import { serialize } from 'dom-form-serializer'

import './EnquiryForm.css'

class Form extends React.Component {
  static defaultProps = {
    name: 'Tour Booking',
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
      <form
        className="BookTour"
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
            placeholder="Your Child's Name"
            name="child-name"
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
            placeholder="Phone"
            name="phone"
            required
          />
        </label>
        <label className="EnquiryForm--Label label-text">
          <p>Child's Date of Birth:</p>
          <input
            className="EnquiryForm--Input"
            type="text"
            placeholder="DD / MM / YYYY"
            name="birthday"
            required
          />
        </label>
        <div className='EnquiryForm--Label label-text'>
          <p>Choose Centre:</p>
          {[ 
            this.renderOption('centre', 'East Malvern'),
            this.renderOption('centre', 'Mildura'),
            this.renderOption('centre', 'Mildura Central')
          ]}
        </div>
        <label className="EnquiryForm--Label label-text">
          <p>Preferred Start Date:</p>
          <input
            className="EnquiryForm--Input"
            type="text"
            placeholder="MM / YYYY"
            name="start-date"
            required
          />
        </label>
        <label className="EnquiryForm--Label">
          <input
            className="EnquiryForm--Input"
            placeholder="Other Comments"
            name="text"
          />
        </label>
        <input type="text" name="_gotcha" style={{ display: 'none' }} />
        {!!subject && <input type="hidden" name="subject" value={subject} />}
        <input type="hidden" name="form-name" value={name} />
        <input
          className="Button hasShadowHover EnquiryForm--SubmitButton"
          type="submit"
          value="Book Now"
          disabled={this.state.disabled}
        />
        <div className='privacy-check'>
          <input className="EnquiryForm--Input" type="checkbox" name="privacy" required />
          <span className='checkbox'></span>
          <p>Yes, I have read and agree to the Great Start <a href="/">Privacy Policy</a></p>
        </div>
      </form>
    )
  }
}

export default Form
