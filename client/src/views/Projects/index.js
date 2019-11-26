import React, { PureComponent, Component } from 'react'
import PublicService from '../../services/PublicServices'
import { FlexLayout, Spinner } from '../../shared'
import ProjectCard from './components/ProjectCard'
import Filter from './components/Filter'
import SideBar from './components/SideBar'

export default class Projects extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      isHovered: null,
      projects: [],
      filters: [],
      error: ''
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    this.fetchProjects()
  }

  fetchProjects = async () => {
    try {
      const projects = await new PublicService().getProjects()
      this.setState(state => ({
        projects: [...state.projects, ...projects],
        filters: []
      }))
    } catch (error) {
      await this.handleError()
    }
  }

  handleError = async () => {
    this.setState(
      {
        isLoading: true,
        error: "Hang On Something Went Wrong, let's try this again."
      },
      () => setTimeout(async () => await this.fetchProjects(), 1500)
    )
  }

  addFilter = filter =>
    this.setState(state => ({ filters: [...state.filters, filter] }))
  handleHover = (id, type) => {
    type === 'enter'
      ? this.setState({ isHovered: id })
      : this.setState({ isHovered: null })
  }
  renderProjects = () => {
    const { darkTheme } = this.props
    return (
      <>
        <Filter filters={this.state.filters} />
        <FlexLayout className="project-wrapper" layout="col" align="center">
          {this.state.projects.length ? (
            this.state.projects.map((project, index) => {
              return (
                <FlexLayout
                  className="card-wrapper"
                  align={index % 2 === 0 ? 'end' : 'start'}
                  layout="col"
                  key={project._id}
                >
                  <ProjectCard
                    className={
                      (index % 2 === 0 ? 'forward' : 'reverse',
                      this.state.isHovered === project._id
                        ? 'hovered'
                        : 'no-hover')
                    }
                    direction={index % 2 === 0 ? 'forward' : 'reverse'}
                    darkTheme={darkTheme}
                    onMouseEnter={() => this.handleHover(project._id, 'enter')}
                    onMouseLeave={() => this.handleHover(null, 'leave')}
                    title={project.title}
                    released={project.released}
                    onLoad={() => this.setState({ isLoading: false })}
                    image={project.images.gif}
                    description={project.description}
                    onClick={() =>
                      this.props.history.push(`/projects/${project._id}`)
                    }
                  />
                </FlexLayout>
              )
            })
          ) : (
            <div className="message">
              <Spinner color={darkTheme ? '#eeff41' : '#f06292'} />
              <p className="error">{this.state.error}</p>
            </div>
          )}
        </FlexLayout>
      </>
    )
  }

  render() {
    return (
      <FlexLayout className="projects" align="center" layout="col">
        <SideBar />
        {this.renderProjects()}
      </FlexLayout>
    )
  }
}
