import React, { PureComponent } from 'react'
import PublicService from '../../services/PublicServices'
import { FlexLayout, Spinner, Card, Button } from '../../shared'
import Wrapper from '../Wrapper'
import { FiX } from 'react-icons/fi'
import StackGrid from 'react-stack-grid'

export default class Projects extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      isHovered: null,
      tags: [],
      projects: [],
      projectsToFilter: [],
      filters: [],
      error: '',
      filterError: ''
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    this.fetchProjects()
    this.fetchFilters()
  }

  fetchProjects = async () => {
    try {
      const projects = await new PublicService().getProjects()
      this.setState(state => ({
        projects: projects,
        projectsToFilter: projects
      }))
    } catch (error) {
      await this.handleError()
    }
  }

  fetchFilters = async () => {
    try {
      const tags = await new PublicService().getTags()
      this.setState({ tags })
    } catch (error) {
      throw error
    }
  }

  renderTags = () => {
    if (this.state.tags.length) {
      return this.state.tags.map(tag => {
        return (
          <li key={tag._id} onClick={() => this.addFilter(tag)}>
            {tag.name}
          </li>
        )
      })
    }
  }

  removeFilters = (index, cb) => {
    const newFilters = this.state.filters
    newFilters.splice(index, 1)
    this.setState(
      {
        filters: newFilters
      },
      () => {
        this.fetchProjects()
        this.filterProject()
      }
    )
    this.forceUpdate()
  }

  renderProjects = () => {
    if (this.state.projectsToFilter.length) {
      return this.state.projectsToFilter.map(project => {
        return (
          <Card key={project._id} className="project-card">
            <img src={project.images.gif} />
            <FlexLayout className="card-details" align="center" layout="col">
              <h3>{project.title}</h3>
              <Button
                title="View Details"
                onClick={() =>
                  this.props.history.push(`/projects/${project._id}`)
                }
                color="blue"
                variant="flat"
              />
            </FlexLayout>
          </Card>
        )
      })
    }
  }

  handleError = async () => {
    this.setState(
      {
        isLoading: true,
        error: "Hang On Something Went Wrong, let's try this again."
      },
      () =>
        setTimeout(async () => {
          await this.fetchProjects()
          await this.fetchFilters()
        }, 1500)
    )
  }

  filterProject = (query, item) => {
    this.state.filters.forEach(async (filter, index) => {
      const projects = await new PublicService().filterProjects(query, item)
      await this.setState(state => ({
        projectsToFilter: projects
      }))
    })
    this.setState({ isLoading: false })
  }

  addFilter = filter => {
    this.setState(
      state => ({
        filters: [...state.filters, filter],
        isLoading: true
      }),
      () => this.filterProject('tags', filter._id)
    )
  }

  renderFilters = () => {
    if (this.state.filters.length) {
      return this.state.filters.map((filter, index) => {
        return (
          <p className="snack released" key={filter._id}>
            {filter.name}
            <Button
              onClick={() => this.removeFilters(index)}
              color="red"
              variant="fab"
            >
              <FiX />
            </Button>
          </p>
        )
      })
    }
  }

  render() {
    return (
      <Wrapper className="projects">
        <FlexLayout className="sidebar" align="center start" layout="col">
          <div className="tag-wrapper">
            {this.renderTags()}
            <p className="error">{this.state.filterError}</p>
          </div>
        </FlexLayout>
        <FlexLayout className="project-container" layout="col">
          <FlexLayout className="filters" align="start space">
            {this.renderFilters()}
          </FlexLayout>
          <StackGrid
            className="project-wrapper"
            columnWidth={300}
            gutterWidth={20}
            gutterHeight={20}
          >
            {this.renderProjects()}
          </StackGrid>
          {!this.state.projectsToFilter.length ? (
            <FlexLayout className="spinner-wrapper" layout="col" align="center">
              <Spinner />
              <p className="error">{this.state.error}</p>
            </FlexLayout>
          ) : null}
        </FlexLayout>
      </Wrapper>
    )
  }
}
