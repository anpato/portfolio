import React, { Component } from 'react'
import PublicService from '../../services/PublicServices'
import { FlexLayout } from '../../shared'
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
    this.fetchProject()
  }

  fetchProject = async () => {
    const project = await new PublicService(
      this.props.match.params.project_id
    ).getProject()
    this.setState({ project })
  }

  renderProject = () => {
    if (this.state.project) {
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
