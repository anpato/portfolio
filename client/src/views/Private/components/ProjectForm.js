import React from 'react'
import TagForm from './TagForm'
import Tags from './Tags'
import {
  FlexLayout,
  FormGroup,
  TextInput,
  Button,
  Spinner
} from '../../../shared'

const ProjectForm = ({
  darkTheme,
  formData,
  onChange,
  onSubmit,
  children,
  imageChange,
  imageUpload,
  isLoading,
  error,
  images,
  history
}) => (
  <FlexLayout className="upload-form" align="center">
    <FormGroup className="form" variant="col" onSubmit={e => onSubmit(e)}>
      <TextInput
        floating
        label="Title"
        name="title"
        value={formData.title}
        color="red"
        onChange={e => onChange(e)}
        required
      />
      <TextInput
        floating
        required
        label="Description"
        name="description"
        value={formData.description}
        onChange={e => onChange(e)}
        color="red"
      />
      <TextInput
        floating
        label="Deployed Link"
        name="deployedLink"
        value={formData.deployedLink}
        onChange={e => onChange(e)}
        color="red"
      />
      <TextInput
        floating
        required
        label="Github Link"
        name="githubLink"
        value={formData.githubLink}
        onChange={e => onChange(e)}
        color="red"
      />
      <FlexLayout className="image-field-wrapper" layout="col">
        <label htmlFor="newGif">Gif</label>
        <FlexLayout>
          <TextInput
            type="file"
            name="project"
            onChange={e => imageChange(e, 'newGif')}
            color="red"
          />
          <Button
            title="+"
            variant="fab"
            color="blue"
            className="add-btn"
            type="button"
            onClick={() => imageUpload('newGif')}
          />
        </FlexLayout>
      </FlexLayout>
      <FlexLayout className="image-field-wrapper" layout="col">
        <label htmlFor="newImage">New Image</label>
        <FlexLayout>
          <TextInput
            type="file"
            name="project"
            color="red"
            onChange={e => imageChange(e, 'newImage')}
          />
          <Button
            title="+"
            variant="fab"
            color="blue"
            className="add-btn"
            type="button"
            onClick={() => imageUpload('newImage')}
          />
        </FlexLayout>
        {images
          ? images.map((image, index) => (
              <p key={index} className="snack released">
                {typeof image === 'string' ? image : image.name}
              </p>
            ))
          : null}
      </FlexLayout>
      {children}
      <FlexLayout className="btn-group" align="space">
        <Button
          className="submit-btn"
          title={isLoading ? '' : 'Update'}
          color={darkTheme ? 'green' : 'blue'}
          type="submit"
          variant="raised"
        >
          {isLoading ? <Spinner size={16} /> : ''}
        </Button>
        <Button
          className="submit-btn"
          title="Cancel"
          color="red"
          type="submit"
          variant="raised"
          onClick={() => history.goBack()}
        >
          {isLoading ? (
            <Spinner size={16} color={darkTheme ? 'green' : 'yellow'} />
          ) : (
            ''
          )}
        </Button>
      </FlexLayout>
      {error ? <p className="error">{error}</p> : ''}
    </FormGroup>
  </FlexLayout>
)

export default ProjectForm
