import React, { Component } from 'react'
import CallToAction from './CallToAction';
import ContactForm from './ContactForm';
import TechStack from './TechStack';
import Social from './Social';
import AdminProjects from './AdminProjects';
import { getProjects } from '../services/api';
import Typist from 'react-typist'
export default class Public extends Component {
    constructor(){
        super();
        this.state = {
            welcome : [],
            projects : [],
            isComplete:false
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

    scrollToSection = () => {
        let section = this.sectionTwo
        this.setState({isComplete:true})
        if(this.state.isComplete === true){
            setTimeout(()=>{
                section.scrollIntoView({
                    block:'start',
                    behavior:'smooth'
                })
            },1000)
        }
    }

    render() {
        const {projects} = this.state
        console.log(this.state.isComplete)
        return (
            <div  className="public">
                <Social/>
                <div id="section-one">
                    <Typist className='intro-text'
                    onTypingDone={this.scrollToSection}>
                        <span>Hi, I'm Andre!</span>
                        <br/>
                        <span>and I'm a front-end developer!</span>
                    </Typist>
                </div>
                <div id="section-two" ref={(el) => this.sectionTwo = el}>
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
