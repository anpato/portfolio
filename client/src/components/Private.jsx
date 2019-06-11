import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'

export default class Private extends Component {
    render() {
        console.log(this.props.location.state)
        if(!this.props.location.state){
            return <Redirect to='/admin/login'/>
        }
        return (
            <div>
                <Link to='/admin/login'>Log Out</Link>
            </div>
        )
    }
}
