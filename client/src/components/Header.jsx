import React from 'react'
import Logo from '../assets/img/SymLogo.svg'

const Header = props => {
  const {yHeight} = props
  const toggleHeight = yHeight > 40 ? 'header small' : 'header'
  
  
  return (
    <nav className={toggleHeight}>
      <img src={Logo} alt='logo'/>
    </nav>   
  )
}

export default Header