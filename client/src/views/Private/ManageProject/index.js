import React, { Component } from 'react'
import PublicService from '../../../services/PublicServices'
import { TextInput, FlexLayout, Button } from '../../../shared'
import { _TagParser } from '../../../helpers'
import ProtectedServices from '../../../services/ProtectedServices'
import ProjectForm from '../components/ProjectForm'
import TagForm from '../components/TagForm'

export default class ManageProject extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      githubLink: '',
      deployedLink: '',
      released: false,
      newTag: '',
      newGif: '',
      images: [],
      tags: [],
      newImage: '',
      isLoading: false,
      createNewTag: false,
      error: '',
      tagError: '',
      newProject: false
    }
  }

  componentDidMount() {
    if (this.props.match.params.project_id) {
      this.fetchProject()
    } else {
      this.setState({ newProject: true })
    }
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
        githubLink: project.github_link,
        deployedLink: project.deploy_link ? project.deploy_link : '',
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
              className="add-btn"
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
    const {
      title,
      description,
      tags,
      images,
      githubLink,
      deployedLink,
      released,
      newProject
    } = this.state
    try {
      const formData = new FormData()
      images.forEach(image => formData.append('projects', image))
      const data = {
        project: {
          title,
          deploy_link: deployedLink,
          github_link: githubLink,
          description,
          released
        },
        tags
      }

      for (let key in data) {
        formData.append(key, JSON.stringify(data[key]))
      }
      if (newProject) {
        const resp = await new ProtectedServices(
          this.props.match.params.project_id,
          null,
          formData
        ).updateProject()
        if (resp.status === 200) {
          this.props.history.push('/dashboard/projects')
        }
      } else {
        const resp = await new ProtectedServices(
          null,
          null,
          formData
        ).uploadProject()
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
          <Button
            className="add-btn"
            type="button"
            title="+"
            color="red"
            onClick={this.addTag}
          />
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
    const {
      title,
      createNewTag,
      description,
      isLoading,
      error,
      newTag,
      tagError,
      tags,
      githubLink,
      deployedLink,
      images,
      newProject
    } = this.state

    return (
      <FlexLayout className="project-manage" align="center">
        <ProjectForm
          onSubmit={this.handleSubmit}
          formData={{ title, description, githubLink, deployedLink }}
          imageChange={this.handleImageChange}
          imageUpload={this.handleImageUpload}
          darkTheme={this.props.darkTheme}
          onChange={this.handleChange}
          images={images}
          error={error}
          isLoading={isLoading}
          history={this.props.history}
          newProject={newProject}
        >
          <TagForm
            onClick={this.removeTag}
            newTag={newTag}
            tags={tags}
            tagError={tagError}
            createNewTag={createNewTag}
            addNewTag={this.addNewTag}
          >
            {this.renderNewTagForm()}
          </TagForm>
        </ProjectForm>
      </FlexLayout>
    )
  }
}
