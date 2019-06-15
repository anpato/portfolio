import React, { Component } from 'react'
import {Panel, Input, Button, Form} from 'muicss/react'
import {Redirect,Link} from 'react-router-dom'
import {FiChevronLeft} from 'react-icons/fi'
import { loginUser } from '../services/api';
export default class Admin extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            isAuthenticated: false
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('token')
        if(token){
            this.setState({isAuthenticated:true})
        }else {
            this.setState({isAuthenticated:false})
        }
    }
    

    handleChange = e => {
        const {name,value} = e.target
        this.setState({[name]:value})
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        const {username,password} = this.state
        try {
            await loginUser({username,password})
            this.setState({isAuthenticated:true})
        } catch (error) {
            this.setState({isAuthenticated:false})
        }
    }

    render() {
        const {username,password,isAuthenticated} = this.state
        if(isAuthenticated === true){
            return <Redirect to={{
                pathname:'/admin/authenticated',
                state : {isAuthenticated}
            }}/>
        }
        return (
            <div className="admin-form">
                
                <Panel className="panel">
                <Link to='/'><FiChevronLeft/></Link>
                <h3>This sign in form is for administrative purposes only.</h3>
                    <Form onChange={this.handleChange} onSubmit={this.handleSubmit}>
                        <Input
                            label = 'Username'
                            name="username"
                            required={true}
                            floatingLabel={true} 
                            defaultValue={username}/>
                        <Input
                            label = 'Password'
                            name="password"
                            required={true}
                            floatingLabel={true} 
                            defaultValue={password}/>
                        <Button variant="raised">Log In</Button>
                    </Form>
                    
                </Panel>
            </div>
        )
    }
}
