import React from 'react'
import { stringify } from 'qs'
import { serialize } from 'dom-form-serializer'
import Image from './Image'

import './EnquiryForm.css'

class Form extends React.Component {
  static defaultProps = {
    name: 'Home Download Form',
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
      })
    })
    .catch(err => {
      this.setState({
        disabled: false,
        alert: this.props.errorMessage
      })
    })
  }

  renderOption = (name, value) => {
    return <label className="checkbox-container" key={value}>
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
      <section className='download-banner home-download'>
        <form
          className="DownloadForm"
          name={name}
          action={action}
          onSubmit={this.handleSubmit}
          data-netlify=""
          data-netlify-honeypot="email"
        >
          <div className='container skinny'>
            {this.state.alert && (
              <div className="EnquiryForm--Alert">{this.state.alert}</div>
            )}
            <h3 className='form-title'>Download Our Family Handbook</h3>
            <p className='form-description'>Fill out the form and download our family handbook or contact us <a href='/'>123 456 789</a></p>
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
            <input type="hidden" name="form-name" value={name} />
            <input
              className="Button hasShadowHover EnquiryForm--SubmitButton"
              type="submit"
              value="Download"
              disabled={this.state.disabled}
            />
          </div>
          <a href='/somefile.txt' download ref={this.myRef}></a>
        </form>
        <Image background src='/images/uploads/handbook.jpg' alt='image of handbook' />
      </section>  
    )
  }
}

export default Form
