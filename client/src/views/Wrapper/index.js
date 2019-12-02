import React, { Component } from 'react'

export default class Wrapper extends Component {
  render() {
    const { className } = this.props
    return <main className={`wrapper ${className}`}>{this.props.children}</main>
  }
}
