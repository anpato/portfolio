import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
export default class Dashboard extends Component {
  render() {
    // if (!this.props.authenticated) {
    //   return <Redirect to="/login" />
    // }
    return <div>Dashboard</div>
  }
}
