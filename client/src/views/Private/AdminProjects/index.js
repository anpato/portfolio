import React, { Component } from 'react'
import PublicService from '../../../services/PublicServices'
import { FlexLayout, Card, Button } from '../../../shared'

export default class AdminProjects extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      projects: []
    }
  }

  componentDidMount() {
    this.fetchProjects()
  }

  fetchProjects = async () => {
    try {
      const projects = await new PublicService().getProjects()
      this.setState({ projects })
    } catch (error) {
      console.error(error)
    }
  }

  renderProjects = () => {
    const { darkTheme } = this.props
    if (this.state.projects && !this.state.isLoading) {
      console.log(this.state.projects)
      return this.state.projects.map(project => (
        <Card key={project._id} className="project-card">
          <img
            src={project.image_gif || project.image_static[0]}
            alt="project"
          />
          <h3>{project.title}</h3>
          <Button
            title="Manage"
            color={darkTheme ? 'green' : 'blue'}
            variant="flat"
            onClick={() =>
              this.props.history.push(`/dashboard/projects/${project._id}`)
            }
          />
        </Card>
      ))
    }
  }

  render() {
    return (
      <FlexLayout className="admin-projects" align="center">
        <FlexLayout className="project-wrapper" align="space wrap">
          {this.renderProjects()}
        </FlexLayout>
      </FlexLayout>
    )
  }
}
