import React from 'react'
import { Button } from '../../../shared'

const Tags = ({ tags, onClick }) =>
  tags.map((tag, index) => (
    <p key={tag} className="snack released">
      <span>
        {tag}
        <Button
          className="add-btn"
          title="X"
          color="red"
          variant="fab"
          onClick={() => onClick(index)}
        >
          X
        </Button>
      </span>
    </p>
  ))
export default Tags
