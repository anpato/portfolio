import React from 'react'
import './Form.scss'
export const FormGroup = ({ className, variant, children, onSubmit }) => (
  <form onSubmit={e => onSubmit(e)} className={`form ${variant} ${className}`}>
    {children}
  </form>
)
