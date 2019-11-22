import React from 'react'
import { Card } from '../../../shared'

const ProjectCard = ({ title, image, released }) => (
  <Card className="project-card">
    <div className="wrapper">
      <img src={image} />
    </div>
    <div className="detail-wrapper">
      <h2>{title}</h2>
      <span>
        Status
        <span className={released ? 'in-process' : 'released'}>
          {released ? 'Released' : 'In Development'}
        </span>
      </span>
    </div>
  </Card>
)

export default ProjectCard
