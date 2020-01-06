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
  state = {
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

  renderForm = () => {
    const { formData } = this.state
    const fields = []
    for (const key in formData) {
      fields.push(
        <TextInput value={formData[key]} name={key} color="red" label={key} />
      )
    }
    return fields.map(field => field)
  }

  render() {
    const { addTag, isLoading } = this.state
    const { darkTheme } = this.props
    return (
      <FlexLayout className="project-manage" align="center">
        <FormGroup variant="vertical">{this.renderForm()}</FormGroup>
      </FlexLayout>
    )
  }
}
