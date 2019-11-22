import React, { PureComponent } from 'react'
import multiPlatformDark from '../../../assets/multi-platform-dark.png'
import multiPlatformLight from '../../../assets/multi-platform-light.png'
import { FlexLayout } from '../../../shared'
import Message from './Message'
const darkModeCloud =
  'https://andre-portfolio-projects.s3.amazonaws.com/assets/svg-dark.png'
const lightModeCloud =
  'https://andre-portfolio-projects.s3.amazonaws.com/assets/multi-platform.png'
export default class AnimatedWelcome extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      wordsToSwap: ['Mobile Developer', 'Full Stack Developer', 'Andre Pato'],
      wordToDisplay: 'Web Developer',
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
      this.state.timer % 2 === 0 ? 'toggle toggle-off' : 'toggle'
    return (
      <FlexLayout className="animated-welcome" layout=" space center">
        <Message selectedWord={this.state.wordToDisplay}>
          <h1 className={toggleTimerClass}>{this.state.wordToDisplay}</h1>
        </Message>
        <div className="right">
          <img
            src={this.props.darkTheme ? darkModeCloud : lightModeCloud}
            alt={this.props.darkTheme ? multiPlatformDark : multiPlatformLight}
          />
        </div>
      </FlexLayout>
    )
  }
}
