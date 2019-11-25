import React, { useState } from 'react'
import { Scroll } from 'react-fns'
import Routes from './routes/Routes'
import NavBar from './components/NavBar'

function App() {
  const [darkTheme, setTheme] = useState(false)
  const [authenticated, setAuthentication] = useState(false)
  return (
    <Scroll
      render={({ x, y }) => (
        <div
          className={`${
            darkTheme ? 'theme--dark' : 'theme--light'
          } theme--wrapper`}
        >
          <NavBar
            window={{ x, y }}
            darkTheme={darkTheme}
            setTheme={setTheme}
            authenticated={authenticated}
            setAuthentication={setAuthentication}
          />
          <Routes
            window={{ x, y }}
            darkTheme={darkTheme}
            setAuthentication={setAuthentication}
            authenticated={authenticated}
          />
        </div>
      )}
    />
  )
}

export default App
