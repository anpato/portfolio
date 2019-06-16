import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import AdminProjects from './AdminProjects';
import { getProjects, deleteProject } from '../services/api';
import ProjectUpload from './ProjectUpload';

export default class Private extends Component {
    constructor(){
        super();
        this.state = {
            projects : []
        }
    }

    async componentDidMount() {
        try {
            this.fetchProjects()
        } catch (error) {
            throw error
        }
    }
    
    fetchProjects = async () => {
        try {
            const projects = await getProjects()
            this.setState({projects})
        } catch (error) {
            throw error
        }
    }

    removeProject = async (id) => {
        await deleteProject(id)
        this.fetchProjects()
    }

    handleLogOut = () => {
        localStorage.clear()
    }

    render() {
        const {projects} = this.state
        const {state} = this.props.location
        if(!state){
            return <Redirect to='/admin/login'/>
        }
        return (
            <div className="admin-home">
                <Link to='/admin/login' onClick={this.handleLogOut}>Log Out</Link>
                <AdminProjects 
                    projects={projects} 
                    removeProject={this.removeProject}
                    state={state}/>
                <ProjectUpload fetchProjects={this.fetchProjects}/>
            </div>
        )
    }
}
