import React from 'react'
import { FlexLayout } from '../../../shared'

const SideBar = ({ children }) => (
  <FlexLayout className="sidebar" align="center" layout="col">
    {children}
  </FlexLayout>
)
export default SideBar
