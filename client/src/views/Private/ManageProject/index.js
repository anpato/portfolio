import React, { Component } from 'react'
import PublicService from '../../../services/PublicServices'
import {
  FormGroup,
  TextInput,
  FlexLayout,
  Button,
  Spinner
} from '../../../shared'
import { _TagParser } from '../../../helpers'
import ProtectedServices from '../../../services/ProtectedServices'

export default class ManageProject extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      newTag: '',
      newGif: '',
      images: [],
      tags: [],
      newImage: '',
      isLoading: false,
      createNewTag: false,
      error: '',
      tagError: ''
    }
  }

  componentDidMount() {
    this.fetchProject()
  }

  fetchProject = async () => {
    try {
      const project = await new PublicService(
        this.props.match.params.project_id
      ).getProject()
      const tags = _TagParser(project.tags)
      this.setState({
        title: project.title,
        description: project.description,
        images: [...project.images.static, project.images.gif],
        tags
      })
    } catch (error) {
      console.error(error)
    }
  }

  handleChange = e =>
    this.setState({
      [e.target.name]: e.target.value,
      tagError: '',
      error: ''
    })

  handleImageUpload = key => {
    this.setState(state => ({
      images: [...state.images, state[key]],
      [key]: ''
    }))
  }

  handleImageChange = (e, key) => {
    this.setState({
      [key]: e.target.files[0]
    })
  }

  removeTag = tag => {
    const currentTagsToAdd = this.state.tags
    currentTagsToAdd.splice(tag, 1)
    this.setState({ tags: currentTagsToAdd })
  }

  renderTags = () => {
    if (this.state.tags.length) {
      return this.state.tags.map((tag, index) => (
        <p key={tag} className="snack released">
          <span>
            {tag}
            <Button
              title="X"
              color="red"
              variant="fab"
              onClick={() => this.removeTag(index)}
            >
              X
            </Button>
          </span>
        </p>
      ))
    }
  }

  addTag = () => {
    if (
      !this.state.tags.includes(this.state.newTag) &&
      this.state.newTag.length > 1
    )
      this.setState({ tags: [...this.state.tags, this.state.newTag] }, () =>
        this.setState({ newTag: '' })
      )
    else
      this.setState({
        tagError: this.state.tags.includes(this.state.newTag)
          ? 'Tag Already Added'
          : 'Please add a tag'
      })
  }

  addNewTag = () => {
    this.setState({ createNewTag: true })
  }

  handleSubmit = async e => {
    e.preventDefault()
    this.setState({ isLoading: true })
    const { title, description, tags, images } = this.state
    try {
      const formData = new FormData()
      images.forEach(image => formData.append('projects', image))
      const data = {
        project: {
          title,
          description
        },
        tags
      }

      for (let key in data) {
        formData.append(key, JSON.stringify(data[key]))
      }
      const resp = await new ProtectedServices(
        this.props.match.params.project_id,
        null,
        formData
      ).updateProject()
      if (resp.status === 200) {
        this.props.history.push('/dashboard/projects')
      }
    } catch (error) {
      this.setState({
        error: 'There was a problem, try again.',
        isLoading: false
      })
    }
  }

  renderNewTagForm = () => {
    if (this.state.createNewTag) {
      return (
        <FlexLayout className="add-tags" align="center">
          <FlexLayout className="tag-input" layout="col">
            <TextInput
              type="text"
              label="Tag"
              value={this.state.newTag}
              name="newTag"
              color="red"
              onChange={this.handleChange}
              onSubmit={this.addTag}
            />
            {this.state.tagError ? (
              <p className="error">{this.state.tagError}</p>
            ) : (
              ''
            )}
          </FlexLayout>
          <Button type="button" title="+" color="red" onClick={this.addTag} />
        </FlexLayout>
      )
    }
  }

  renderImageSnacks = () => {
    if (this.state.images.length) {
      return this.state.images.map((image, index) => {
        return (
          <p key={index} className="snack released">
            {typeof image === 'string' ? image : image.name}
          </p>
        )
      })
    }
  }

  render() {
    const { title, description, isLoading, error } = this.state

    return (
      <FlexLayout className="project-manage" align="center">
        <FlexLayout className="upload-form" align="center">
          <FormGroup
            className="form"
            variant="col"
            onSubmit={this.handleSubmit}
          >
            <TextInput
              floating
              label="Title"
              name="title"
              value={title}
              color="red"
              required
            />
            <TextInput
              floating
              required
              label="Description"
              name="description"
              value={description}
              color="red"
            />
            <FlexLayout className="image-field-wrapper" layout="col">
              <label htmlFor="newGif">Gif</label>
              <FlexLayout>
                <TextInput
                  type="file"
                  name="project"
                  onChange={e => this.handleImageChange(e, 'newGif')}
                  color="red"
                />
                <Button
                  title="+"
                  variant="fab"
                  color="blue"
                  className="add-btn"
                  type="button"
                  onClick={() => this.handleImageUpload('newGif')}
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
                  onChange={e => this.handleImageChange(e, 'newImage')}
                />
                <Button
                  title="+"
                  variant="fab"
                  color="blue"
                  className="add-btn"
                  type="button"
                  onClick={() => this.handleImageUpload('newImage')}
                />
              </FlexLayout>
              {this.renderImageSnacks()}
            </FlexLayout>
            <FlexLayout className="tag-area" layout="col">
              <FlexLayout className="tags" align="start space wrap">
                {this.renderTags()}
              </FlexLayout>
              {this.renderNewTagForm()}
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
                color={this.props.darkTheme ? 'green' : 'blue'}
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
                onClick={() => this.props.history.goBack()}
              >
                {isLoading ? (
                  <Spinner
                    size={16}
                    color={this.props.darkTheme ? 'green' : 'yellow'}
                  />
                ) : (
                  ''
                )}
              </Button>
            </FlexLayout>
            {error ? <p className="error">{error}</p> : ''}
          </FormGroup>
        </FlexLayout>
      </FlexLayout>
    )
  }
}
