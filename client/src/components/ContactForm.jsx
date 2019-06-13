import React, { Component } from 'react'
import {Panel, Button, Form, Input, Select, Option, Textarea} from 'muicss/react'
export default class ContactForm extends Component {
    constructor(){
        super();
        this.state = {
            firstname : '',
            lastname : '',
            email: '',
            options : [
                'Recruitment',
                'Information',
            ],
            input : 'Recruitment',
            message : ''
        }
    }

    handleChange = e => {
        const {name,value} = e.target;
        this.setState({[name]:value})
    }

    handleSubmit = async (e) => {
        e.preventDefault()
    }

    render() {
        const {options, firstname, lastname, email, input, message} = this.state
        return (
            <Panel className="contact-form form">
                <Form onChange={this.handleChange} onSubmit={this.handleSubmit}>
                    <Input 
                        label='First Name'
                        floatingLabel={true}
                        name='firstname'
                        defaultValue={firstname}/>
                    <Input 
                        label='Last Name'
                        floatingLabel={true}
                        name='lastname'
                        defaultValue={lastname}/>
                    <Input 
                        label='Email'
                        floatingLabel={true}
                        name='email'
                        defaultValue={email}/>
                    <Select name='input' label='Reason For Contact' defaultValue={input}>
                        {options.map(option => {
                            return <Option key={option} value={option} label={option}/>
                        })}
                    </Select>
                    <Textarea label='Message' name='message' defaultValue={message}/>
                    <Button variant='raised' color="primary">Submit</Button>
                </Form>
            </Panel>
        )
    }
}
