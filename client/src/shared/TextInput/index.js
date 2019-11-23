import React from 'react'
import './Input.scss'

export const TextInput = ({
  label,
  floating,
  color,
  name,
  type,
  onChange,
  value,
  required,
  autocomplete
}) => (
  <div
    className={`input input-${color} ${floating ? 'float' : 'no-float'} ${
      value ? (value.length && !floating ? 'hide' : '') : 'nofloat'
    } ${value ? (value.length && floating ? 'has-value' : '') : ''}`}
  >
    <input
      name={name}
      type={type}
      onChange={e => onChange(e)}
      value={value}
      required={required}
    />
    <label htmlFor={name}>
      <span>{label}</span>
    </label>
  </div>
)
