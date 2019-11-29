import React from 'react'
import { FlexLayout, Button } from '../../../shared'

const ProjectCard = ({
  className,
  direction,
  description,
  darkTheme,
  onClick,
  onMouseEnter,
  onMouseLeave,
  title,
  image,
  released
}) => (
  <FlexLayout
    className={`project-card ${className}`}
    layout="center"
    direction={direction}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <FlexLayout className="detail-wrapper" align="center" layout="col">
      <span className={released ? 'snack released' : 'snack in-process'}>
        {released ? 'Released' : 'In Development'}
      </span>
      <h2>{title}</h2>
      <p>{className === 'hovered' ? description : null}</p>
      <Button
        className="nav-btn"
        title="View Details"
        color={darkTheme ? 'green' : 'blue'}
        onClick={onClick}
        variant="raised"
      />
    </FlexLayout>
    <img src={image} alt="Project" />
  </FlexLayout>
)

export default ProjectCard
