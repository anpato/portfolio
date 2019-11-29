import React, { Component } from 'react'
import {
  FlexLayout,
  FormGroup,
  TextInput,
  Button,
  Spinner
} from '../../../shared'
import BitmojiPosted from '../../../assets/bitmoji-posted.png'
import BitmojiTalk from '../../../assets/bitmoji-talk-soon.png'
import PublicService from '../../../services/PublicServices'
export default class Contact extends Component {
  constructor() {
    super()
    this.state = {
      sent: false,
      loading: false,
      error: '',
      resMsg: '',
      email: '',
      name: '',
      subject: '',
      message: ''
    }
  }

  handleSubmit = async e => {
    e.preventDefault()
    try {
      this.setState({ loading: true })

      const res = await this.sendMail().then(() => {
        this.setState({
          email: '',
          name: '',
          subject: '',
          message: '',
          sent: true,
          loading: false,
          resMsg:
            "Thanks for reaching out! I'll get back to you as soon as possible!"
        })
      })
    } catch (error) {
      console.log(error)
      this.setState(
        {
          error: 'Hang on, it looks like something went wrong... '
        },
        () =>
          setTimeout(
            async () =>
              await this.sendMail().catch(err => {
                this.setState({
                  loading: false,
                  error:
                    "Well, something is definitely broken, I'm going to look into it! Can you try again later?"
                })
              }),
            1000
          )
      )
    }
  }

  sendMail = async () => {
    const { email, name, subject, message } = this.state
    try {
      await new PublicService(null, {
        email,
        name,
        subject,
        message
      }).contact()
    } catch (error) {
      throw error
    }
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  render() {
    const {
      email,
      name,
      subject,
      message,
      sent,
      loading,
      error,
      resMsg
    } = this.state
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
              disabled={loading}
              title={loading ? '' : 'Send'}
              variant="raised"
              color={darkTheme ? 'green' : 'blue'}
            >
              <Spinner size={16} color={darkTheme ? 'green' : 'white'} />
            </Button>
            {error ? <p className="error">{error}</p> : null}
            {resMsg ? (
              <p style={darkTheme ? { color: '#f8f8f8' } : { color: '#333' }}>
                {resMsg}
              </p>
            ) : null}
          </FormGroup>
        </FlexLayout>
      </FlexLayout>
    )
  }
}
