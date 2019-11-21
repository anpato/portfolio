import React from 'react'
import { Scroll } from 'react-fns'
import Routes from './routes/Routes'

function App() {
  return (
    <Scroll
      render={({ x, y }) => (
        <>
          <Routes window={{ x, y }} />
        </>
      )}
    />
  )
}

export default App
