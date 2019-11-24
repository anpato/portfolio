import React, { Component } from 'react'
import PublicService from '../../services/PublicServices'
import { FlexLayout, Spinner } from '../../shared'
import { Carousel } from 'react-responsive-carousel'

export default class Project extends Component {
  constructor(props) {
    super(props)
    this.state = {
      project: null,
      isLoading: false
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    this.fetchProject()
  }

  fetchProject = async () => {
    try {
      const project = await new PublicService(
        this.props.match.params.project_id
      ).getProject()
      this.setState(
        state => ({ project: project }),
        () => setTimeout(() => this.setState({ isLoading: false }), 1000)
      )
    } catch (error) {
      console.error(error)
    }
  }

  renderProject = () => {
    if (this.state.project && !this.state.isLoading) {
      const { title, description, images, released } = this.state.project
      return (
        <FlexLayout className="project-card" layout="col" align="center">
          <Carousel
            className="project-carousel"
            stopOnHover={true}
            infiniteLoop={true}
            showStatus={false}
            showIndicators={images.static.length > 1 ? true : false}
          >
            {images.static.map((image, index) => (
              <div key={index}>
                <img src={image} alt="project" />
              </div>
            ))}
          </Carousel>
          <h2>{title}</h2>
          <span className={released ? 'snack released' : 'snack in-process'}>
            {released ? 'Released' : 'In Development'}
          </span>
          <p>{description}</p>
        </FlexLayout>
      )
    } else {
      return <Spinner color={this.props.darkTheme ? '#eeff41' : '#f06292'} />
    }
  }

  render() {
    return (
      <FlexLayout className="project" align="center">
        {this.renderProject()}
      </FlexLayout>
    )
  }
}
