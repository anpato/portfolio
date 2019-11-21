import React from 'react'
import './Flex.scss'
export const FlexLayout = ({ className, children, variant, layout }) => (
  <div
    className={`flex-layout ${className ? className : ''} ${
      variant ? variant : ''
    } ${layout ? layout : ''}`}
  >
    {children}
  </div>
)
