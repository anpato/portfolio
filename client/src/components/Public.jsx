import React, { Component } from 'react'
import CallToAction from './CallToAction';
import {FiChevronsDown} from 'react-icons/fi'
export default class Public extends Component {
    constructor(){
        super();
        this.state = {
            welcome : []
        }
    }


    render() {
        return (
            <div className="public">
                
            <CallToAction/> 
            <FiChevronsDown/>
            </div>
        )
    }
}
