import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import { getToken } from '../services/TokenService'
import Home from '../views/Home'
import Projects from '../views/Projects'
import Project from '../views/Project'
import Login from '../views/Login'
import Dashboard from '../views/Private/Dashboard'
import AdminProjects from '../views/Private/AdminProjects'
import ManageProject from '../views/Private/ManageProject'

const Routes = ({ authenticated, setAuthentication, darkTheme }) => {
  const fetchToken = () => {
    const token = getToken()
    if (token) {
      setAuthentication(true)
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
          exact
          path="/dashboard"
          component={Dashboard}
          darkTheme={darkTheme}
          authenticated={authenticated}
        />
        <ProtectedRoute
          exact
          path="/dashboard/projects"
          component={AdminProjects}
          darkTheme={darkTheme}
          authenticated={authenticated}
        />
        <ProtectedRoute
          path="/dashboard/projects/:project_id"
          component={ManageProject}
          authenticated={authenticated}
        />
      </Switch>
    </>
  )
}
export default Routes
