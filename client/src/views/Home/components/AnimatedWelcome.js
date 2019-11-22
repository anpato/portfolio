import React, { PureComponent } from 'react'
import multiPlatform from '../../../assets/multi-platform.png'
import { FlexLayout } from '../../../shared'
import Message from './Message'
export default class AnimatedWelcome extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      wordsToSwap: ['Web', 'Full Stack'],
      words: ['I', 'am', 'a', 'Mobile', 'developer'],
      wordToDisplay: '',
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
    const wordsArr = this.state.words
    const wordsToSwap = this.state.wordsToSwap
    const wordToRemove = wordsArr[3]
    const wordToAdd = wordsToSwap.splice(0, 1)[0]
    wordsArr.splice(3, 1, wordToAdd)
    this.setState({
      wordsToSwap: [...wordsToSwap, wordToRemove],
      words: wordsArr
    })
  }

  render() {
    return (
      <FlexLayout className="animated-welcome" layout=" space center">
        <div className="animated-message">
          {this.state.words.map((word, index) => (
            <h1 key={index}>{word}</h1>
          ))}
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
