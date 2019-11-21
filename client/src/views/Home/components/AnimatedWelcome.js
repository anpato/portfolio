import React, { Component } from 'react'
import multiPlatform from '../../../assets/multi-platform.png'
import { FlexLayout } from '../../../shared'
import Message from './Message'
export default class AnimatedWelcome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wordsToSwap: ['stand', 'jump', 'walk', 'run'],
      words: ['Lorem', 'ipsum', 'dolor'],
      wordToDisplay: '',
      ready: false
    }
  }

  shouldComponentUpdate(state) {
    if (state.ready) {
      return false
    } else {
      return true
    }
  }

  componentDidMount() {
    this.setState({ ready: true })
  }

  render() {
    return (
      <FlexLayout className="animated-welcome">
        <div className="animated-message">
          <Message
            words={this.state.words}
            wordToDisplay={this.state.wordToDisplay}
            wordSwap={this.handleWordSwap}
          />
        </div>
        <div className="right">
          <img
            src="https://andre-portfolio-projects.s3.amazonaws.com/assets/multi-platform.png"
            alt={multiPlatform}
          />
        </div>
      </FlexLayout>
    )
  }
}
