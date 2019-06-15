import React, { Component } from 'react'
import {Form, Panel, Input, Button, Textarea} from 'muicss/react'
import { uploadProjects } from '../services/api';

export default class ProjectUpload extends Component {
    constructor(props){
        super(props);
        this.state = {
            userId : localStorage.getItem('userId'),
            name: '',
            description: '',
            url: '',
            image : null,
            files: null
        }
    }

    handleChange = e => {
        const {name,value} = e.target
        this.setState({[name]:value})
        
    }

    handleUpload = async (e) => {
        await this.setState({image: e.target.files})
        const formData = new FormData()
        // await formData.append('image', this.state.image[0])
        await this.setState({files:formData.append('image', this.state.image[0])})
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        const {name,url,description,userId,files} = this.state
        console.log(files)
        await uploadProjects({name,url,description,userId,files})
    }

    render() {
        const {name,description,url,image} = this.state
        console.log(this.state.files)
        return (
            <Panel className="project-upload">
                <Form onSubmit={this.handleSubmit}>
                    <Input
                        onChange={this.handleChange}
                        floatingLabel={true}
                        type="text"
                        required={true}
                        label="Project Name"
                        name="name"
                        defaultValue={name}/>
                    <Input
                        onChange={this.handleChange} 
                        floatingLabel={true}
                        type="text"
                        required={true}
                        label="Project Url"
                        name="url"
                        defaultValue={url}/>
                    <Input 
                        onChange={this.handleUpload}
                        type="file"
                        required={true}
                        label="Project Image"
                        name="image"
                        defaultValue={image}/>
                    <Textarea 
                        onChange={this.handleChange}
                        floatingLabel={true}
                        type="text"
                        required={true}
                        label="Project Description"
                        name="description"
                        defaultValue={description}/>
                    <Button variant="raised">Upload</Button>
                </Form>
            </Panel>
        )
    }
}
