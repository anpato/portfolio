import React, { Component } from 'react'
import {Form, Panel, Input, Button, Textarea} from 'muicss/react'
import { uploadProjects } from '../services/api';
import S3FileUpload from 'react-s3';
import { config } from '../services/AwsConfig'
export default class ProjectUpload extends Component {
    constructor(props){
        super(props);
        this.state = {
            userId : localStorage.getItem('userId'),
            name: '',
            description: '',
            url: '',
            image : '',
        }
    }

    handleUpload = e => {
        S3FileUpload.uploadFile(e.target.files[0], config)
        .then(data => {
            this.setState({image:data.location})
            console.log(data.location)
            return data
        })
        .catch(err => alert(err))
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        const {name,url,description,userId,image} = this.state
        await uploadProjects({name,url,description,userId,image})
    }

    render() {
        const {name,description,url,image} = this.state

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
                    />
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
