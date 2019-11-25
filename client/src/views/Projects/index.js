import React, { Component } from 'react'
import PublicService from '../../services/PublicServices'
import { FlexLayout, Spinner } from '../../shared'
import ProjectCard from './components/ProjectCard'
import Filter from './components/Filter'
import SideBar from './components/SideBar'

export default class Projects extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      projects: [],
      filters: []
    }
  }

  async componentDidMount() {
    this.setState({ isLoading: true })
    await this.fetchProjects()
  }

  fetchProjects = async () => {
    try {
      const projects = await new PublicService().getProjects()
      this.setState(
        state => ({
          projects: [...state.projects, ...projects],
          filters: []
        }),
        () => this.setState({ isLoading: false })
      )
    } catch (error) {
      console.error(error)
    }
  }

  addFilter = filter =>
    this.setState(state => ({ filters: [...state.filters, filter] }))

  renderProjects = () => {
    const { darkTheme } = this.props
    return (
      <>
        <Filter filters={this.state.filters} />
        <FlexLayout className="project-wrapper" variant="center">
          {this.state.projects.map((project, index) => {
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
                onClick={() =>
                  this.props.history.push(`/projects/${project._id}`)
                }
              />
            )
          })}
        </FlexLayout>
      </>
    )
  }

  render() {
    const { darkTheme } = this.props
    return (
      <FlexLayout className="projects" variant="center">
        <SideBar />
        {!this.state.isLoading && this.state.projects.length ? (
          this.renderProjects()
        ) : (
          <Spinner color={darkTheme ? '#eeff41' : '#f06292'} />
        )}
      </FlexLayout>
    )
  }
}
