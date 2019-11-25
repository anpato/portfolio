import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
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
      isLoading: false,
      error: ''
    }
  }
  componentDidMount() {
    this.props.fetchToken(this.props.history)
  }

  handleSubmit = async e => {
    e.preventDefault()
    this.setState({ isLoading: true })
    const { username, password } = this.state
    try {
      new ProtectedServices(null, {
        username,
        password
      })
        .handleLogin()
        .then(async res => {
          if (res === 200) this.props.fetchToken()
        })
    } catch (error) {
      this.setState({
        isLoading: false,
        error: 'Invalid Credentials',
        password: ''
      })
    }
  }

  handleChange = e =>
    this.setState({ [e.target.name]: e.target.value, error: '' })

  render() {
    if (this.props.authenticated) {
      return <Redirect to="/dashboard" />
    }
    const { username, password, isLoading, error } = this.state
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
              disabled={error ? true : false}
              color={darkTheme ? 'green' : 'blue'}
            >
              {isLoading ? (
                <Spinner size={14} color={darkTheme ? '#eeff41' : '#f06292'} />
              ) : null}
            </Button>
          </FormGroup>
          {error ? <h4 className="error">{error}</h4> : null}
        </Card>
      </FlexLayout>
    )
  }
}
