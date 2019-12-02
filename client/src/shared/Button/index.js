import React from 'react'
import './Button.scss'
export const Button = ({
  className,
  children,
  disabled,
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
    disabled={disabled}
    onClick={onClick}
    type={type}
  >
    {title || children}
  </button>
)
