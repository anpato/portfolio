import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Wrapper from '../views/Wrapper'

const ProtectedRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authenticated ? (
        <Wrapper {...rest}>
          <Component {...props} {...rest} />
        </Wrapper>
      ) : (
        <Redirect to="/" />
      )
    }
  />
)

export default ProtectedRoute
