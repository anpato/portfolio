import React from 'react'
import './Flex.scss'
export const FlexLayout = ({
  className,
  children,
  align,
  layout,
  direction
}) => (
  <div
    className={`flex-layout ${className ? className : ''} ${
      align ? align : ''
    } ${layout ? layout : ''} ${direction ? `${direction}-row` : ''}`}
  >
    {children}
  </div>
)
