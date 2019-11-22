import React, { Component } from 'react'
import { FlexLayout, FormGroup, TextInput, Button } from '../../../shared'
import BitmojiPosted from '../../../assets/bitmoji-posted.png'
import BitmojiTalk from '../../../assets/bitmoji-talk-soon.png'
export default class Contact extends Component {
  constructor() {
    super()
    this.state = {
      sent: false,
      loading: false,
      email: '',
      name: '',
      subject: '',
      message: ''
    }
  }

  handleSubmit = async e => {
    e.preventDefault()
    this.setState({ sent: true })
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  render() {
    const { email, name, subject, message, sent, loading } = this.state
    const { darkTheme } = this.props
    return (
      <FlexLayout className="contact" layout="center">
        <FlexLayout className="contact-wrapper" layout="space center">
          <div className="image-wrapper">
            <img
              className={sent ? ` posted sent-posted` : 'posted'}
              src="https://andre-portfolio-projects.s3.amazonaws.com/assets/bitmoji-posted.png"
              alt={BitmojiPosted}
            />
            <img
              className={sent ? `talk sent-talk` : 'talk'}
              src="https://andre-portfolio-projects.s3.amazonaws.com/assets/bitmoji-talk-soon.png"
              alt={BitmojiTalk}
            />
          </div>
          <FormGroup
            className="contact-form"
            variant="vertical"
            onSubmit={this.handleSubmit}
          >
            <TextInput
              name="name"
              required
              type="text"
              label="Name"
              value={name}
              floating
              onChange={this.handleChange}
              color={darkTheme ? 'green' : 'blue'}
            />
            <TextInput
              name="email"
              required
              type="email"
              value={email}
              label="Email"
              floating
              onChange={this.handleChange}
              color={darkTheme ? 'green' : 'blue'}
            />
            <TextInput
              name="subject"
              type="text"
              required
              value={subject}
              label="Subject"
              floating
              onChange={this.handleChange}
              color={darkTheme ? 'green' : 'blue'}
            />
            <textarea
              name="message"
              placeholder="Leave A Message"
              value={message}
              onChange={this.handleChange}
            />
            <Button
              title={loading ? '' : 'Send'}
              variant="raised"
              color={darkTheme ? 'green' : 'blue'}
            />
          </FormGroup>
        </FlexLayout>
      </FlexLayout>
    )
  }
}
