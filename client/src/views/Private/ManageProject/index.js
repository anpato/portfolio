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
      image_uploaded: null,
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
      console.log(project)
    } catch (error) {
      console.error(error)
    }
  }

  handleImages = e => {
    const image = e.target.files[0]
    console.log(image)
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
    try {
      const formData = new FormData()
      this.state.images.forEach(image => formData.append('projects', image))
      const data = {
        project: {
          ...this.state.formData
        },
        tags: this.state.tags
      }
      for (let key in data) {
        formData.append(key, JSON.stringify(data[key]))
      }

      const resp = await this.Private.uploadProject(formData)
      console.log(resp)
    } catch (error) {
      console.error(error)
    }
  }

  renderImagesToBeUpload = () => {
    return this.state.images.length
      ? this.state.images.map(image => (
          <div>
            <h3>{image.name}</h3>
          </div>
        ))
      : null
  }

  render() {
    const { addTag, isLoading } = this.state
    const { darkTheme } = this.props
    console.log(this.state.images)
    return (
      <FlexLayout className="project-manage" align="center">
        <FormGroup variant="vertical" onSubmit={this.handleSubmit}>
          {this.renderForm()}
          <TextInput
            onChange={this.handleImages}
            type="file"
            name="images"
            value={this.state.image_uploaded}
          />
          <Button title="Upload" color="blue" variant="raised" />
          {this.renderImagesToBeUpload()}
        </FormGroup>
      </FlexLayout>
    )
  }
}
