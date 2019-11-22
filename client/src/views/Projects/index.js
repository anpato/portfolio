import React, { Component } from 'react'
import PublicService from '../../services/PublicServices'
import { FlexLayout } from '../../shared'
import ProjectCard from './components/ProjectCard'

export default class Projects extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      projects: []
    }
  }

  async componentDidMount() {
    await this.fetchProjects()
  }

  fetchProjects = async () => {
    try {
      const projects = await new PublicService().getProjects()
      this.setState(state => ({
        projects: [...state.projects, ...projects]
      }))
    } catch (error) {
      console.error(error)
    }
  }

  renderProjects = () => {
    if (this.state.projects.length) {
      return this.state.projects.map(project => (
        <ProjectCard
          title={project.title}
          released={project.released}
          image={project.image_url}
        />
      ))
    }
  }

  render() {
    return (
      <FlexLayout className="projects" variant="center">
        <FlexLayout className="project-wrapper" variant="start wrap ">
          {this.renderProjects()}
        </FlexLayout>
      </FlexLayout>
    )
  }
}
