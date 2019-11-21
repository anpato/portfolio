import React from 'react'
import './Button.scss'
export const Button = ({
  className,
  children,
  color,
  onClick,
  type,
  title,
  variant
}) => (
  <button
    className={`btn ${className} ${variant ? variant.toLowerCase() : null} ${
      color ? color.toLowerCase() : null
    }`}
    onClick={onClick}
    type={type}
  >
    {title || children}
  </button>
)
