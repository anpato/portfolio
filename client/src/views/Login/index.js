import React, { Component } from 'react'
import {
  FlexLayout,
  Card,
  FormGroup,
  TextInput,
  Button,
  Spinner
} from '../../shared'
import ProtectedServices from '../../services/ProtectedServices'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      isLoading: false
    }
  }
  componentDidMount() {
    this.props.fetchToken()
  }

  handleSubmit = async e => {
    e.preventDefault()
    this.setState({ isLoading: true })
    const { username, password } = this.state
    try {
      const resp = await new ProtectedServices(null, {
        username,
        password
      }).handleLogin()
      if (resp === 200) {
        this.props.fetchToken()
      }
    } catch (error) {
      this.setState({ isLoading: false })
      console.error(error)
    }
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  render() {
    // if (this.props.authenticated) {
    //   return <Redirect to="/" />
    // }
    const { username, password, isLoading } = this.state
    const { darkTheme } = this.props
    return (
      <FlexLayout className="login" align="center">
        <Card className="login-card">
          <FormGroup variant="vertical" onSubmit={this.handleSubmit}>
            <TextInput
              label="Username"
              type="text"
              color={darkTheme ? 'green' : 'blue'}
              value={username}
              name="username"
              floating
              required
              onChange={this.handleChange}
            />
            <TextInput
              label="Password"
              type="password"
              name="password"
              value={password}
              color={darkTheme ? 'green' : 'blue'}
              floating
              required
              onChange={this.handleChange}
            />
            <Button
              title={isLoading ? null : 'Login'}
              variant="raised"
              color={darkTheme ? 'green' : 'blue'}
            >
              {isLoading ? <Spinner size={14} /> : null}
            </Button>
          </FormGroup>
        </Card>
      </FlexLayout>
    )
  }
}
