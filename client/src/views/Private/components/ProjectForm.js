import React from 'react'

const ProjectForm = ({
  darkTheme,
  error,
  onSubmit,
  imageChange,
  imageUpload,
  onChange,
  renderSnacks,
  renderTags,
  formData
}) => (
  <FlexLayout className="upload-form" align="center">
    <FormGroup className="form" variant="col" onSubmit={this.handleSubmit}>
      <TextInput
        floating
        label="Title"
        name="title"
        value={formData.title}
        color="red"
        required
      />
      <TextInput
        floating
        required
        label="Description"
        name="description"
        value={formData.description}
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
        {renderSnacks()}
      </FlexLayout>
      <FlexLayout className="tag-area" layout="col">
        <FlexLayout className="tags" align="start space wrap">
          {this.renderTags()}
        </FlexLayout>
        {renderNewTagForm()}
        <Button
          className="add-btn"
          title="Add New Tag"
          color="red"
          type="button"
          variant="flat"
          onClick={() => this.setState({ createNewTag: true })}
        />
      </FlexLayout>
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
