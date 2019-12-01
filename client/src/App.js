import React, { useState, useEffect } from 'react'
import Routes from './routes/Routes'
import NavBar from './components/NavBar'
import { getToken } from './services/TokenService'

function App() {
  const [darkTheme, setTheme] = useState(false)
  const [authenticated, setAuthentication] = useState(false)
  useEffect(() => {
    const token = getToken()
    if (token) {
      setAuthentication(true)
    }
  }, [])
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
