import React, { Component } from 'react'
import CallToAction from './CallToAction';
import {FiChevronsDown} from 'react-icons/fi'
import ContactForm from './ContactForm';
import TechStack from './TechStack';
import Social from './Social';
export default class Public extends Component {
    constructor(){
        super();
        this.state = {
            welcome : []
        }
    }


    render() {
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
                
                </div>
            <FiChevronsDown/>
            </div>
        )
    }
}
