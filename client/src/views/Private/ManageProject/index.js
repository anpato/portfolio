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
    this.state = {
      formData: {
        title: '',
        description: '',
        github_Link: '',
        deploy_Link: '',
        released: ''
      },
      new_Tag: '',
      images: [],
      tags: [],
      addTag: false,
      isLoading: false
    }
  }

  componentDidMount() {
    if (this.props.match.params.project_id) {
      this.fetchProject()
    }
  }

  fetchProject = async () => {
    try {
      const resp = await new PublicService(
        this.props.match.params.project_id
      ).getProject()

      this.setState({
        formData: {
          title: resp.title,
          description: resp.description,
          github_Link: resp.github_link,
          deploy_Link: resp.deploy_link,
          released: resp.released
        },
        images: [resp.images.gif, ...resp.images.static],
        tags: _TagParser(resp.tags)
      })
    } catch (error) {
      throw error
    }
  }

  handleSubmit = async e => {
    e.preventDefault()
    this.setState({ isLoading: true })
    const {
      formData: { title, description, github_Link, deploy_Link, released },
      tags,
      images
    } = this.state
    try {
      const formData = new FormData()
      images.forEach(image => formData.append('projects', image))
      const data = {
        project: {
          title,
          deploy_link: deploy_Link,
          github_link: github_Link,
          description,
          released: released === 'true' || 'yes' ? true : 'false'
        },
        tags
      }

      for (let key in data) {
        formData.append(key, JSON.stringify(data[key]))
      }
      if (this.props.match.params.project_id) {
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
        console.log(resp)
        if (resp === 200) {
          this.props.history.push('/dashboard/projects')
        }
      }
    } catch (error) {
      this.setState({
        error: 'There was a problem, try again.',
        isLoading: false
      })
    }
  }

  renderStaticFields = () => {
    const { formData } = this.state
    const inputFields = []
    for (let key in formData) {
      const inputName = `${key[0].toUpperCase()}${key.slice(1)}`
      const inputField = inputName.split('_').join(' ')
      inputFields.push(
        <TextInput
          key={key}
          name={key}
          value={formData[key]}
          label={inputField}
          color="red"
          onChange={e => this.handleChange(e, 'formData')}
          type="text"
          floating
          required={key === 'deploy_Link' ? false : true}
        />
      )
    }
    return inputFields.map(field => field)
  }

  handleImageUpload = e => {
    let newImage = e.target.files[0]
    this.setState(state => ({
      images: [...state.images, newImage]
    }))
  }

  handleChange = (e, key) => {
    if (key && key === 'formData') {
      const fields = { [e.target.name]: e.target.value }

      this.setState(state => ({
        formData: Object.assign(state.formData, fields)
      }))
    } else {
      this.setState({ [e.target.name]: e.target.value })
    }
  }

  renderImageField = () => {
    return (
      <TextInput
        type="file"
        label="New Image"
        floating
        value=""
        color="red"
        onChange={this.handleImageUpload}
      />
    )
  }

  removeItem = (index, key) => {
    const field = this.state[key]
    field.splice(index, 1)
    this.setState({ [key]: field })
  }

  renderImageSnacks = () => {
    if (this.state.images.length) {
      return this.state.images.map((image, index) => {
        return (
          <p key={index} className="snack released">
            {typeof image === 'object' ? image.name : image}
            <Button
              className="add-btn"
              color="red"
              variant="fab"
              type="button"
              onClick={() => this.removeItem(index, 'images')}
            >
              {<Delete />}
            </Button>
          </p>
        )
      })
    }
  }

  addTag = e => {
    e.preventDefault()
    this.setState(
      state => ({ tags: [...state.tags, state.new_Tag] }),
      () => this.setState({ new_Tag: '' })
    )
  }

  renderTagSnacks = () => {
    if (this.state.tags.length) {
      return this.state.tags.map((tag, index) => (
        <p key={index} className="snack released">
          {tag}
          <Button
            className="add-btn"
            color="red"
            variant="fab"
            type="button"
            onClick={() => this.removeItem(index, 'tags')}
          >
            {<Delete />}
          </Button>
        </p>
      ))
    }
  }

  renderTagField = () => {
    if (this.state.addTag) {
      return (
        <FlexLayout className="tag-field" layout="row" align="center">
          <TextInput
            type="text"
            value={this.state.new_Tag}
            name="new_Tag"
            label="New Tag"
            onChange={this.handleChange}
            color="red"
            onSubmit={this.addTag}
          />
          <Button
            className="add-btn"
            color="red"
            variant="fab"
            type="button"
            onClick={this.addTag}
          >
            {<Add />}
          </Button>
        </FlexLayout>
      )
    }
  }

  render() {
    const { addTag, isLoading } = this.state
    const { darkTheme } = this.props
    return (
      <FlexLayout className="project-manage" align="center">
        <FormGroup
          className="upload-form"
          variant="vertical"
          onSubmit={this.handleSubmit}
        >
          {/* renders static fields */}
          {this.renderStaticFields()}
          {/* renders static fields */}

          {/* renders image field */}
          {this.renderImageField()}
          {/* renders image field */}

          {/* Renders image snacks */}
          {this.renderImageSnacks()}
          {/* Renders image snacks */}
          <FlexLayout className="snack-area" layout="col">
            <Button
              className="add-snack"
              title={addTag ? 'Close' : 'Add Tag'}
              color="red"
              variant="flat"
              type="button"
              onClick={() =>
                this.setState(state => ({ addTag: !state.addTag }))
              }
            />
            {this.renderTagField()}
            <FlexLayout className="tags-row" layout="row" align="start wrap">
              {this.renderTagSnacks()}
            </FlexLayout>
          </FlexLayout>
          <FlexLayout className="btn-group" align="center">
            <Button
              type="submit"
              title={isLoading ? '' : 'Upload'}
              color="blue"
              variant="flat"
            >
              {isLoading ? (
                <Spinner color={darkTheme ? 'green' : 'white'} size={16} />
              ) : null}
            </Button>
            <Button
              type="button"
              title="Cancel"
              color="red"
              variant="flat"
              onClick={() => this.props.history.push('/dashboard/projects')}
            />
          </FlexLayout>
        </FormGroup>
      </FlexLayout>
    )
  }
}
