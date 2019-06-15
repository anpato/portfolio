import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import AdminProjects from './AdminProjects';
import { getProjects } from '../services/api';
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
            const projects = await getProjects()
            this.setState({projects})
        } catch (error) {
            throw error
        }
    }
    

    render() {
        const {projects} = this.state
        if(!this.props.location.state){
            return <Redirect to='/admin/login'/>
        }
        return (
            <div className="admin-home">
                <Link to='/admin/login'>Log Out</Link>
                <AdminProjects projects={projects}/>
                <ProjectUpload/>
            </div>
        )
    }
}
