import React from 'react'
import { FlexLayout, Button } from '../../../shared'

const ProjectCard = ({
  className,
  darkTheme,
  direction,
  onClick,
  title,
  image,
  released
}) => (
  <FlexLayout
    className={`project-wrapper-card ${className}`}
    layout="wrap center"
    direction={direction}
  >
    <FlexLayout className="detail-wrapper" align="center" layout="col">
      <h2>{title}</h2>
      <span>
        <h3>Status</h3>
        <span className={released ? 'snack released' : 'snack in-process'}>
          {released ? 'Released' : 'In Development'}
        </span>
      </span>
      <Button
        title="View Details"
        onClick={onClick}
        className="nav-btn"
        variant="raised"
        color={darkTheme ? 'green' : 'blue'}
      />
    </FlexLayout>
    <div className="wrapper">
      <img src={image} alt="Project" />
    </div>
  </FlexLayout>
)

export default ProjectCard
