import React, { Component } from 'react'
import AnimatedWelcome from './components/AnimatedWelcome'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: props.darkTheme
    }
  }
  shouldComponentUpdate(nextProps) {
    if (nextProps.darkTheme === true || nextProps.darkTheme === false) {
      console.log(nextProps)
      return false
    }
    console.log(this.props)
  }
  render() {
    return (
      <main>
        <AnimatedWelcome />
      </main>
    )
  }
}
