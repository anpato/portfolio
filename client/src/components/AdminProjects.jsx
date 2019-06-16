import React from 'react'
import {Link} from 'react-router-dom';
import {Panel, Button} from 'muicss/react'

const AdminProjects =  (props) => {
    const {projects} = props
    console.log(projects)
        if(projects.length > 0){
            return (
                <Panel className="admin-projects ">
                    {projects.map(project => {
                        return (
                            <Panel className="project mui--z3" key={project.id}>
                                <img src={project.image} alt="project shot"/>
                                <h3>{project.name}</h3>
                                <p>{project.description}</p>
                            </Panel>
                        )
                    })}
                </Panel>
            )
        }
        else {
            return (null)
        }
}

export default AdminProjects