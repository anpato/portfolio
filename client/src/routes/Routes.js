import React, { useState } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import { getToken } from '../services/TokenService'
import { _VerifyToken } from '../services/AuthServices'
import Home from '../views/Home'

const Routes = ({ darkTheme }) => {
  const [authenticated, setAuthentication] = useState(false)
  const handleRedirect = () => {
    if (authenticated) {
      return <Redirect to="/dashboard" />
    }
  }
  // const fetchToken = () => {
  // const token = getToken()
  // if (token)
  //   _VerifyToken(token)
  //     .then(name => {
  //       setAuthentication(true)
  //       handleRedirect()
  //     })
  //     .catch(() => setAuthentication(false))
  // }

  return (
    <>
      <Switch>
        <Route
          exact
          path="/"
          render={props => <Home {...props} darkTheme={darkTheme} />}
        />
        {/* <ProtectedRoute
          path="/dashboard"
          component={Home}
          fetchToken={fetchToken}
          authenticated={authenticated}
        />
        <ProtectedRoute
          path="/customers"
          component={Customers}
          authenticated={authenticated}
        />
        <ProtectedRoute
          path="/inventory"
          component={Inventory}
          authenticated={authenticated}
        /> */}
      </Switch>
    </>
  )
}
export default Routes
