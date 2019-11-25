import React from 'react'
import { FormGroup, TextInput, FlexLayout } from '../shared'

const UploadForm = ({ formData, isLoading, error }) => (
  <FormGroup>
    <TextInput label="title" name="title" value={formData.title} />
    <TextInput label="title" name="title" value={formData.title} />
    <FlexLayout className="tags">{tags}</FlexLayout>
    <TextInput label="Images" name="images" value={formData.images} />
  </FormGroup>
)
export default UploadForm
