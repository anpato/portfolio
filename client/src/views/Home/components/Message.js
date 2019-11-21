import React from 'react'
import { useTrail, animated } from 'react-spring'

const Message = ({ words }) => {
  const config = { mass: 5, tension: 4000, friction: 900 }
  const trail = useTrail(words.length, {
    config,
    opacity: 1,
    x: 40,
    height: 80,
    from: { opacity: 0, x: 20, height: 0 }
  })

  return trail.map(({ x, height, ...rest }, index) => (
    <animated.div
      style={{
        ...rest,
        transform: x.interpolate(x => `translate3d(3,${x}px,0)`)
      }}
    >
      <animated.div key={index} style={{ height }}>
        <h1>{words[index]}</h1>
      </animated.div>
    </animated.div>
  ))
}

export default Message
