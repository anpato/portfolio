import React from 'react'
import { FlexLayout } from '../../../shared'

const Filter = ({ filters }) => {
  return (
    <FlexLayout className="filter" align="center">
      {filters.map(filter => (
        <span className="snack">{filter}</span>
      ))}
    </FlexLayout>
  )
}
export default Filter
