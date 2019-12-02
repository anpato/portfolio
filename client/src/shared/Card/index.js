import React from 'react'
import './Card.scss'

export const Card = ({ children, className, size }) => (
  <div
    className={`card ${className ? className : ''} ${
      size ? `card-${size.toLowerCase()}` : ''
    }`}
  >
    {children}
  </div>
)
