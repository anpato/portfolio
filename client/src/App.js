import React, { useState } from 'react'
import { Scroll } from 'react-fns'
import Routes from './routes/Routes'
import NavBar from './components/NavBar'

function App() {
  const [darkTheme, setTheme] = useState(false)

  return (
    <Scroll
      render={({ x, y }) => (
        <div
          className={`${
            darkTheme ? 'theme--dark' : 'theme--light'
          } theme--wrapper`}
        >
          <NavBar window={{ x, y }} darkTheme={darkTheme} setTheme={setTheme} />
          <Routes window={{ x, y }} darkTheme={darkTheme} />
        </div>
      )}
    />
  )
}

export default App
