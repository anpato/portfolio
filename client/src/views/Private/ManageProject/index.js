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
      released: false,
      new_Tag: '',
      images: {},
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

  handleTextChange = e => {
    console.log(e.target.value)
    // this.setState(state => ({
    //   formData: Object.assign(state.formData, {
    //     [e.target.name]: e.target.value
    //   })
    // }))
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
        <input type="file" />
      </>
    )
  }

  render() {
    const { addTag, isLoading } = this.state
    const { darkTheme } = this.props
    return (
      <FlexLayout className="project-manage" align="center">
        <FormGroup variant="vertical">
          {this.renderForm()}
          <Button title="Upload" color="blue" variant="raised" />
        </FormGroup>
      </FlexLayout>
    )
  }
}
