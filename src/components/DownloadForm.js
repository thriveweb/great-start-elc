import React from 'react'
import { stringify } from 'qs'
import { serialize } from 'dom-form-serializer'

import './DownloadForm.css'

class Form extends React.Component {
  static defaultProps = {
    name: 'Download Form',
    subject: '', // optional subject of the notification email
    action: '',
    successMessage: 'Thanks for your enquiry, we will get back to you soon',
    errorMessage:
      'There is a problem, your message has not been sent, please try contacting us via email'
  }

  constructor(props) {
    super(props);
    this.myRef = React.createRef();

    this.state = {
      alert: '',
      disabled: false
    }
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
      }, () => {
        this.myRef.current.click()
      })
    })
    .catch(err => {
      this.setState({
        disabled: false,
        alert: this.props.errorMessage
      })
    })
  }

  ComponentDidUpdate = () => {

  }

  renderOption = (name, value) => {
    const { fields } = this.props
    const { centre } = fields

    return <label className="checkbox-container" key={value}>
      <input 
        className="EnquiryForm--Input" 
        type="radio" 
        name={name}
        value={value}
        checked={centre === value ? true : false}
        onChange={this.props.handleChange}
      /> 
      {value}
      <span className='checkbox'></span>
    </label>
  }

  render() {
    const { name, subject, action, formName, active, fields, title, description, familyHandbookDownload } = this.props
    const { emailaddress = '', yourname = '', phone = '' } = fields
    // const { eastMalvern, mildura, milduraCentral } = familyHandbookDownload

    return <form
        className={`DownloadForm download-banner-form ${active ? 'active' : ''}`}
        name={formName}
        action={action}
        onSubmit={this.handleSubmit}
        data-netlify=""
        data-netlify-honeypot="email"
      >
        {this.state.alert && (
          <div className="EnquiryForm--Alert">{this.state.alert}</div>
        )}
        <h3>{title}</h3>
        <p className='form-description'>{description}</p>
        <label className="EnquiryForm--Label">
          <input
            className="EnquiryForm--Input"
            type="text"
            placeholder="Your Name"
            name="yourname"
            value={yourname}
            onChange={this.props.handleChange}
            required
          />
        </label>
        <label className="EnquiryForm--Label">
          <input
            className="EnquiryForm--Input"
            type="email"
            placeholder="Email"
            name="emailaddress"
            value={emailaddress}
            onChange={this.props.handleChange}
            required
          />
        </label>
        <label className="EnquiryForm--Label">
          <input
            className="EnquiryForm--Input"
            type="text"
            placeholder="Phone"
            name="phone"
            value={phone}
            onChange={this.props.handleChange}
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
        <input type="text" name="_gotcha" style={{ display: 'none' }} />
        {!!subject && <input type="hidden" name="subject" value={subject} />}
        <input type="hidden" name="form-name" value={formName} />
          <input
            className="Button hasShadowHover EnquiryForm--SubmitButton"
            type="submit"
            value="Download"
            disabled={this.state.disabled}
          />
        <a href='{formDownload}' download ref={this.myRef}></a>
      </form>
  }
}

export default Form
