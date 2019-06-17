import React, { Component } from 'react'
import {Panel, Button, Form, Input, Select, Option, Textarea} from 'muicss/react'
import { contact } from '../services/api';
import CircularProgress from '@material-ui/core/CircularProgress';
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
            message : '',
            isSent:false,
            isFullfilled : false,
            isError: false
        }
    }

    handleChange = e => {
        const {name,value} = e.target;
        this.setState({[name]:value})
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        const {firstname,lastname,email,input,message} = this.state
        let params = {
            from : email,
            subject : input,
            text : `This message is from ${firstname} ${lastname} and here is their message: ${message}`,
        }
        try {
            this.setState({isSent:true})
            await contact(params)
            setTimeout(()=>{this.setState({isFullfilled:true})},2000)
        } catch (error) {
            this.setState({isFullfilled:false,isSent:false,isError:true})
        }
    }

    render() {
        const {options, firstname, lastname, email, input, message,isSent,isFullfilled,isError} = this.state
        if(isSent === true){
            if(isFullfilled=== true){
                return (
                    <Panel className='contact-form' style={{textAlign:'center'}}>
                        <h2>Thank you for reaching out! I will get back to you shortly!</h2>
                    </Panel>
                )
            }
            return (
                <Panel className='contact-form' style={{textAlign:'center'}}>
                    <CircularProgress/>
                </Panel>
            )
        } else if(isSent === false){
            if(isError === true){
                return (
                    <Panel className="contact-form form">
                        <h3>There was a problem submitting your request...</h3>
                        <p>Please verify your information and try again.</p>
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
}
