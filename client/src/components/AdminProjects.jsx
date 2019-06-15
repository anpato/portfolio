import React from 'react'
import {Panel, Button} from 'muicss/react'

const AdminProjects =  (props) => {
    const {projects} = props
    return (
        <Panel className="admin-projects">
            {projects ? projects.map(project => {
            return <Panel className="project" key={project.id}>
                <img src={project.image} alt="project shot"/>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
            </Panel>
        }): null}
        </Panel>
    )
}

export default AdminProjects