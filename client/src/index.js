import React from 'react'
import ReactDOM from 'react-dom'
import './styles/App.scss'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { get } from 'http'

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)
