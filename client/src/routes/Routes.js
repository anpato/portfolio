import React, { useState } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import { getToken } from '../services/TokenService'
import { _VerifyToken } from '../services/AuthServices'
import Home from '../views/Home'
import Projects from '../views/Projects'
import Project from '../views/Project'
import Login from '../views/Login'
import ProtectedServices from '../services/ProtectedServices'

const Routes = ({ darkTheme }) => {
  const [authenticated, setAuthentication] = useState(false)
  const handleRedirect = () => {
    if (authenticated) {
      console.log(authenticated)
      return <Redirect to="/projects" />
    }
  }
  const fetchToken = () => {
    const token = getToken()
    if (token)
      new ProtectedServices(null, null, token)
        .verifyToken()
        .then(resp => {
          if (resp.status === 200) {
            setAuthentication(true)
            handleRedirect()
          }
        })
        .catch(() => setAuthentication(false))
  }
  return (
    <>
      <Switch>
        <Route
          exact
          path="/"
          render={props => <Home {...props} darkTheme={darkTheme} />}
        />
        <Route
          exact
          path="/projects"
          render={props => <Projects {...props} darkTheme={darkTheme} />}
        />
        <Route
          exact
          path="/projects/:project_id"
          render={props => <Project {...props} darkTheme={darkTheme} />}
        />
        <Route
          exact
          path="/login"
          render={props => (
            <Login
              {...props}
              darkTheme={darkTheme}
              fetchToken={fetchToken}
              authenticated={authenticated}
            />
          )}
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
