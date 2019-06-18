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

    componentDidMount() {
        this.setState({isSubmit:false})
    }

    handleUpload = e => {
        S3FileUpload.uploadFile(e.target.files[0], config)
        .then(data => {
            this.setState({image:data.location})
            return data
        })
        .catch(err => alert(err))
    }

    handleChange = e => {
        const {name, value} = e.target
        this.setState({[name]:value})
    }

    handleSubmit = async (e) => {
        const {fetchProjects} = this.props
        e.preventDefault()
        const {name,url,description,userId,image} = this.state
        await uploadProjects({name,url,description,userId,image})
        fetchProjects()
    }

    render() {
        const {name,description,url} = this.state

        return (
            <Panel className="project-upload">
                <Form ref="uploadForm" onSubmit={this.handleSubmit} onChange={this.handleChange}>
                    <Input
                        floatingLabel={true}
                        type="text"
                        label="Project Name"
                        name="name"
                        defaultValue={name}/>
                    <Input
                        floatingLabel={true}
                        type="text"
                        label="Project Url"
                        name="url"
                        defaultValue={url}/>
                    <Input 
                        onChange={this.handleUpload}
                        type="file"
                        label="Project Image"
                    />
                    <Textarea 
                        floatingLabel={true}
                        type="text"
                        label="Project Description"
                        name="description"
                        defaultValue={description}/>
                    <Button variant="raised">Upload</Button>
                </Form>
            </Panel>
        )
    }
}
