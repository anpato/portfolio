import React from 'react'
import './Flex.scss'
export const FlexLayout = ({ className, children, align, layout }) => (
  <div
    className={`flex-layout ${className ? className : ''} ${
      align ? align : ''
    } ${layout ? layout : ''}`}
  >
    {children}
  </div>
)
