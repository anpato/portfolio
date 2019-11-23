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
    const { darkTheme } = this.props
    if (this.state.projects.length) {
      return this.state.projects.map((project, index) => {
        return (
          <ProjectCard
            className={index % 2 === 0 ? 'forward' : 'reverse'}
            direction={index % 2 === 0 ? 'forward' : 'reverse'}
            key={project._id}
            darkTheme={darkTheme}
            title={project.title}
            released={project.released}
            image={project.images.gif}
            description={project.description}
            onClick={() => this.props.history.push(`/projects/${project._id}`)}
          />
        )
      })
    }
  }

  render() {
    return (
      <FlexLayout className="projects" variant="center">
        <FlexLayout className="project-wrapper" variant="center">
          {this.renderProjects()}
        </FlexLayout>
      </FlexLayout>
    )
  }
}
