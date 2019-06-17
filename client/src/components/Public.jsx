import React, { Component } from 'react'
import CallToAction from './CallToAction';
import ContactForm from './ContactForm';
import TechStack from './TechStack';
import Social from './Social';
import AdminProjects from './AdminProjects';
import { getProjects } from '../services/api';
export default class Public extends Component {
    constructor(){
        super();
        this.state = {
            welcome : [],
            projects : []
        }
    }

    componentDidMount() {
        this.fetchProjects()
    }

    fetchProjects = async () => {
        try {
            const projects = await getProjects()
            this.setState({projects})
        } catch (error) {
            throw error
        }
    }

    render() {
        const {projects} = this.state
        return (
            <div  className="public">
                <Social/>
                <div id="section-one">
                    

                </div>
                <div id="section-two">
                <CallToAction/> 
                <TechStack/>
                <ContactForm/>
                </div>
                <div id="section-three">
                    <h2>My Projects</h2>
                <AdminProjects projects={projects}/>
                </div>
            </div>
        )
    }
}
