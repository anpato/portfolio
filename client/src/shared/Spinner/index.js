import React from 'react'
import Loader from 'react-loader-spinner'
export const Spinner = ({ size, color }) => (
  <Loader className="spinner" type="TailSpin" color={color} height={size} />
)
