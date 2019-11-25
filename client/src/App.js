import React, { useState } from 'react'
import { Scroll } from 'react-fns'
import Routes from './routes/Routes'
import NavBar from './components/NavBar'

function App() {
  const [darkTheme, setTheme] = useState(false)
  const [authenticated, setAuthentication] = useState(false)
  return (
    <div
      className={`${darkTheme ? 'theme--dark' : 'theme--light'} theme--wrapper`}
    >
      <NavBar
        darkTheme={darkTheme}
        setTheme={setTheme}
        authenticated={authenticated}
        setAuthentication={setAuthentication}
      />
      <Routes
        darkTheme={darkTheme}
        setAuthentication={setAuthentication}
        authenticated={authenticated}
      />
    </div>
  )
}

export default App
