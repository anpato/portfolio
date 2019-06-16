import React from 'react'
import {Link} from 'react-router-dom';
import {Panel, Button} from 'muicss/react'

const AdminProjects =  (props) => {
    const {projects, removeProject,state} = props
        if(projects.length > 0){
            if(state){
                return (
                    <Panel className="admin-projects ">
                        {projects.map(project => {
                            return (
                                <Panel className="project mui--z3" key={project.id}>
                                    <img src={project.image} alt="project shot"/>
                                    <h3>{project.name}</h3>
                                    {
                                        project.description.length > 2 ? 
                                        <p>{project.description}</p> : 
                                        <p>This project is still in the works! Stay tuned for updates!</p>
                                    }
                                    <Button variant='raised'>Edit</Button>
                                    <Button variant='raised' onClick={()=> removeProject(project.id)}>Delete</Button>
                                </Panel>
                            )
                        })}
                    </Panel>
                )
            }
            else {
                return (
                    <Panel className="admin-projects ">
                        {projects.map(project => {
                            return (
                                <Panel className="project mui--z3" key={project.id}>
                                    <img src={project.image} alt="project shot"/>
                                    <h3>{project.name}</h3>
                                    {
                                        project.description.length > 2 ? 
                                        <p>{project.description}</p> : 
                                        <p>This project is still in the works! Stay tuned for updates!</p>
                                    }
                                    <a href={project.url} target="_blank" rel="noopener noreferrer"><Button>View</Button></a>
                                </Panel>
                            )
                        })}
                    </Panel>
                )
            }
        }
        else {
            return (null)
        }
}

export default AdminProjects