import React from 'react'
import { FlexLayout, TextInput, Button } from '../../../shared'
import Tags from './Tags'

const TagForm = ({ children, onClick, tags, addNewTag }) => (
  <FlexLayout className="tag-area" layout="col">
    <FlexLayout className="tags" align="start space wrap">
      <Tags tags={tags} onClick={onClick} />
    </FlexLayout>
    {children}
    <Button
      className="add-btn"
      title="Add New Tag"
      color="red"
      type="button"
      variant="flat"
      onClick={addNewTag}
    />
  </FlexLayout>
)
export default TagForm
