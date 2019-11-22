import React, { PureComponent } from 'react'
import multiPlatform from '../../../assets/multi-platform.png'
import { FlexLayout } from '../../../shared'
import Message from './Message'
export default class AnimatedWelcome extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      wordsToSwap: ['Mobile', 'Full Stack'],
      wordToDisplay: 'Web',
      timer: 0
    }
  }

  componentDidMount() {
    this.word = setInterval(() => this.swapword(), 3000)
  }
  componentWillUnmount() {
    clearInterval(this.word)
  }

  swapword = () => {
    const words = this.state.wordsToSwap
    const wordToSwap = words.splice(0, 1)[0]
    this.setState(state => ({
      wordsToSwap: [...words, state.wordToDisplay],
      wordToDisplay: wordToSwap,
      timer: state.timer + 1
    }))
  }

  render() {
    const toggleTimerClass =
      this.state.timer % 2 === 0 ? 'toggle' : 'toggle toggle-off'
    return (
      <FlexLayout className="animated-welcome" layout=" space center">
        <div className="animated-message">
          <h2>I Am A</h2>
          <h1 className={toggleTimerClass}>{this.state.wordToDisplay}</h1>
          <h2>Developer</h2>
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
