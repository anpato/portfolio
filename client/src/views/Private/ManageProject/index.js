import React, { Component } from 'react'
import PublicService from '../../../services/PublicServices'
import {
  TextInput,
  FlexLayout,
  Button,
  FormGroup,
  Spinner
} from '../../../shared'
import { _TagParser } from '../../../helpers'
import ProtectedServices from '../../../services/ProtectedServices'
import { FiX as Delete, FiPlus as Add } from 'react-icons/fi'

export default class ManageProject extends Component {
  constructor(props) {
    super(props)
    this.Public = new PublicService()
    this.Private = new ProtectedServices()
    this.state = {
      formData: {
        title: '',
        description: '',
        github_Link: '',
        deploy_Link: ''
      },
      removedCounter: 0,
      updating: false,
      image_uploaded: '',
      released: false,
      new_Tag: '',
      images: [],
      tags: [],
      addTag: false,
      isLoading: false
    }
  }

  componentDidMount() {
    return this.props.match.params.project_id ? this.fetchProjectById() : null
  }

  fetchProjectById = async () => {
    try {
      const project = await this.Public.getProject(
        this.props.match.params.project_id
      )
      const images = [project.image_gif, ...project.image_static]
      console.log(project)
      this.setState({
        formData: {
          title: project.title || '',
          deploy_Link: project.deploy_link || '',
          github_Link: project.github_link || '',
          description: project.description || ''
        },
        images,
        tags: project.tags,
        updating: true
      })
    } catch (error) {
      console.error(error)
    }
  }

  handleImages = e => {
    const image = e.target.files[0]
    this.setState(state => ({
      images: [...state.images, image]
    }))
  }

  handleTextChange = (e, query) => {
    const values = {
      [e.target.name]: e.target.value
    }
    if (query) {
      this.setState({ [query]: e.target.value })
    } else {
      this.setState(state => ({
        formData: Object.assign(state.formData, values)
      }))
    }
  }

  renderForm = () => {
    const { formData } = this.state
    const fields = []
    for (const key in formData) {
      fields.push(
        <TextInput
          onChange={this.handleTextChange}
          key={key}
          value={formData[key]}
          name={key}
          color="red"
          label={key}
        />
      )
    }
    return (
      <>
        {fields.map(field => field)}
        <select
          onChange={e => this.handleTextChange(e, 'released')}
          name="released"
        >
          <option value={false}>NO</option>
          <option value={true}>Yes</option>
        </select>
      </>
    )
  }

  handleSubmit = async e => {
    e.preventDefault()
    this.setState({ isLoading: true })
    try {
      const formData = new FormData()
      this.state.images.forEach(image => {
        if (typeof image !== 'string') {
          formData.append('projects', image)
        }
      })
      const data = {
        project: {
          ...this.state.formData,
          released: this.state.released,
          project_images: [...this.state.images]
        },
        tags: this.state.tags
      }
      for (let key in data) {
        formData.append(key, JSON.stringify(data[key]))
      }
      this.state.updating
        ? this.Private.updateProject(
            this.props.match.params.project_id,
            formData
          ).then(() => this.props.history.push('/dashboard/projects'))
        : await this.Private.uploadProject(formData).then(() =>
            this.props.history.push('/dashboard/projects')
          )
    } catch (error) {
      console.error(error)
    }
  }

  handleRemoveItem = (type, index) => {
    const data = this.state[type]
    data.splice(index, 1)
    this.setState(state => ({
      [type]: data,
      removedCounter: state.removedCounter + 1
    }))
  }

  renderImagesToBeUpload = () => {
    return this.state.images.length
      ? this.state.images.map((image, index) => (
          <div
            key={index}
            style={{ width: '80%', display: 'flex', alignItems: 'center' }}
          >
            <Button
              type="button"
              variant="fab"
              color="red"
              onClick={() => this.handleRemoveItem('images', index)}
            >
              X
            </Button>
            <h3 style={{ marginLeft: '1em' }}>{image.name || image}</h3>
          </div>
        ))
      : null
  }

  render() {
    // const { addTag, isLoading } = this.state
    // const { darkTheme } = this.props
    return (
      <FlexLayout className="project-manage" align="center">
        <FormGroup variant="vertical" onSubmit={this.handleSubmit}>
          {this.renderForm()}
          <TextInput onChange={this.handleImages} type="file" name="images" />
          {this.state.removedCounter > 0 ? (
            <p>{this.state.removedCounter} Items have been removed</p>
          ) : null}
          {this.state.isLoading ? (
            <Button color="blue" variant="raised">
              <Spinner size={20} color="#f8f8f8" />
            </Button>
          ) : (
            <Button title="Upload" color="blue" variant="raised" />
          )}

          {this.renderImagesToBeUpload()}
        </FormGroup>
      </FlexLayout>
    )
  }
}
