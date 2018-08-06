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

  render() {
    const { name, subject, action } = this.props

    return (
      <form
        className="BookTour"
        name={name}
        action={action}
        onSubmit={this.handleSubmit}
        data-netlify=""
        data-netlify-honeypot="_gotcha"
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
            name="email"
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
          Child's Date of Birth:
          <input
            className="EnquiryForm--Input"
            type="text"
            placeholder="DD / MM / YYYY"
            name="birthday"
            required
          />
        </label>
        <label className="EnquiryForm--Label label-text">
        Choose Centre:
          <input className="EnquiryForm--Input" name="checkbox" placeholder="East Malvern"/>
          <input className="EnquiryForm--Input" name="checkbox" placeholder="Mildura"/>
          <input className="EnquiryForm--Input" name="checkbox" placeholder="Mildura Central"/>
        </label>
        <label className="EnquiryForm--Label label-text">
          Preferred Start Date:
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
          className="Button .hasShadow EnquiryForm--SubmitButton"
          type="submit"
          value="Book Now"
          disabled={this.state.disabled}
        />
        <div className='privacy-check'>
          <input className="EnquiryForm--Input" name="checkbox" /><p>Yes, I have read and agree to the Great Start <a href="/">Privacy Policy</a></p>
        </div>
      </form>
    )
  }
}

export default Form
