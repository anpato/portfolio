import React from 'react'
import { useTrail, animated } from 'react-spring'

const Message = ({ children, selectedWord }) => {
  return (
    <div className="animated-message">
      {selectedWord === 'Andre Pato' ? <h2>I Am</h2> : <h2>I Am A</h2>}
      {children}
      {/* {selectedWord === 'Andre Pato' ? '' : <h2>Developer</h2>} */}
    </div>
  )
}

export default Message
