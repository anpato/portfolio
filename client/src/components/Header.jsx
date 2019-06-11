import React from 'react'
import {Appbar} from 'muicss/react'

const Header = props => {
  const {yHeight} = props
  const toggleHeight = yHeight > 40 ? 'header small' : 'header'
   
  
  return (
    <nav className={toggleHeight}>
    </nav>   
  )
}

export default Header