import React, { PureComponent } from 'react'
import PublicService from '../../services/PublicServices'
import { FlexLayout, Spinner, Card, Button } from '../../shared'
import Wrapper from '../Wrapper'
import { FiX } from 'react-icons/fi'
import {
  CSSGrid,
  layout,
  makeResponsive,
  measureItems
} from 'react-stonecutter'

const Grid = makeResponsive(measureItems(CSSGrid), {
  maxWidth: 1200,
  minPadding: 20
})
export default class Projects extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      tags: [],
      projects: [],
      projectsToFilter: [],
      filters: [],
      error: ''
    }
  }

  componentDidMount() {
    this.fetchProjects()
    this.fetchFilters()
  }

  handleError = async () => {
    this.setState(
      {
        isLoading: true,
        error: "Hang On Something Went Wrong, let's try this again."
      },
      async () => {
        await this.fetchProjects()
        await this.fetchFilters()
      }
    )
  }

  fetchProjects = async () => {
    try {
      const projects = await new PublicService().getProjects()
      this.setState(state => ({
        projects: [...state.projects, projects],
        projectsToFilter: projects
      }))
    } catch (error) {
      // this.handleError()
    }
  }

  fetchFilters = async () => {
    try {
      const tags = await new PublicService().getTags()
      this.setState({ tags, isLoading: false })
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
    // this.forceUpdate()
  }

  renderProjects = () => {
    if (this.state.projectsToFilter.length) {
      return this.state.projectsToFilter.map(project => {
        return (
          <div key={project._id} itemHeight={300} className="project-card">
            <Card>
              <img
                src={project.image_gif || project.image_static[0]}
                alt="Project"
              />
              <FlexLayout className="card-details" align="center" layout="col">
                <h3>{project.title}</h3>
                <Button
                  title="View Details"
                  onClick={() =>
                    this.props.history.push(`/projects/${project._id}`)
                  }
                  color={this.props.darkTheme ? 'green' : 'blue'}
                  variant="flat"
                />
              </FlexLayout>
            </Card>
          </div>
        )
      })
    }
  }

  filterProject = (query, item) => {
    this.state.filters.forEach(async (filter, index) => {
      const projects = await new PublicService().filterProjects(query, item)
      this.setState(state => ({
        projectsToFilter: projects
      }))
    })
  }

  addFilter = filter => {
    if (!this.state.filters.length) {
      this.setState(
        state => ({
          filters: [...state.filters, filter]
        }),
        () => this.filterProject('tags', filter._id)
      )
      return null
    }

    this.state.filters.forEach(ExsitingFilter => {
      if (filter.name !== ExsitingFilter.name) {
        this.setState(
          state => ({
            filters: [...state.filters, filter]
          }),
          () => this.filterProject('tags', filter._id)
        )
      }
    })
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
          <Grid
            className="grid-wrapper"
            columns={4}
            columnWidth={300}
            gutterWidth={50}
            gutterHeight={20}
            layout={layout.pinterest}
            duration={400}
            easing="ease-out"
          >
            {this.renderProjects()}
          </Grid>
          {!this.state.projectsToFilter.length ? (
            <FlexLayout className="spinner-wrapper" layout="col" align="center">
              <Spinner color={this.props.darkTheme ? '#eeff41' : '#82d4fa'} />
              <p className="error">{this.state.error}</p>
            </FlexLayout>
          ) : null}
        </FlexLayout>
      </Wrapper>
    )
  }
}
