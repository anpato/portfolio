import React, { PureComponent } from 'react'
import AnimatedWelcome from './components/AnimatedWelcome'

export default class Home extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      theme: props.darkTheme
    }
  }
  render() {
    return (
      <main>
        <AnimatedWelcome />
      </main>
    )
  }
}
