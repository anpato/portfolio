import React, { Component } from 'react'

export default class Wrapper extends Component {
  render() {
    return <main className="wrapper">{this.props.children}</main>
  }
}
