import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import { getToken } from '../services/TokenService'
import { _VerifyToken } from '../services/AuthServices'
import Home from '../views/Home'
import Projects from '../views/Projects'
import Project from '../views/Project'
import Login from '../views/Login'
import ProtectedServices from '../services/ProtectedServices'
import Dashboard from '../views/Dashboard'

const Routes = ({ authenticated, setAuthentication, darkTheme, history }) => {
  const handleRedirect = () => {
    if (authenticated) {
      return history.push('/dashboard')
    }
  }
  const fetchToken = () => {
    const token = getToken()
    if (token) {
      setAuthentication(true)
      handleRedirect()
    } else {
      setAuthentication(false)
    }
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
        <ProtectedRoute
          path="/dashboard"
          component={Dashboard}
          authenticated={authenticated}
        />
        {/* <ProtectedRoute
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
