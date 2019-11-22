import React, { PureComponent } from 'react'
import AnimatedWelcome from './components/AnimatedWelcome'
import About from './components/About'

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
        <AnimatedWelcome darkTheme={this.props.darkTheme} />
        <About />
      </main>
    )
  }
}
