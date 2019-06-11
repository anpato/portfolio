import React, { Component } from 'react'
import {Panel, Input, Button, Form} from 'muicss/react'
import {Redirect} from 'react-router-dom'
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
        this.setState({isAuthenticated:false})
    }
    

    handleChange = e => {
        const {name,value} = e.target
        this.setState({[name]:value})
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        try {
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
