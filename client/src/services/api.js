const Axios = require('axios');
const S3FileUpload = require('react-s3');
const { config } = require('./AwsConfig')
const JwtToken = 'token';
const BASE_URL = 'http://localhost:3001';

const api = Axios.create({
    baseURL : BASE_URL,
    headers : {
        'Authorization': `Bearer ${JwtToken}`,
        'Access-Control-Allow-Origin': '*',
        
    }
});
// ***Auth***
export const loginUser = async (data) => {
    try {
        const resp = await api.post('/auth/login', data);
        localStorage.setItem('token', resp.data.token)
        localStorage.setItem('userId', resp.data.user.id)
        return resp.data
    } catch (error) {
        throw error
    }
} 

export const signUpUser = async (data) => {
    try {
        const send = await api.post('/auth/signup', data)
        return send
    } catch (error) {
        throw error
    }
}

export const getCurrentUser = async () => {
    try {
        const id = localStorage.getItem('userId')
        const resp = await api.get(`/users/${id}`)
        return resp.data
    } catch (error) {
        
    }
}

export const getProjects = async () => {
    try {
        const projects = await api.get('/projects')
        return projects.data
    } catch (error) {
        throw error
    }
}

export const uploadFile = async (file,config) => {
    try {
        const send = await Axios.get(S3FileUpload.uploadFile(file,config))
        console.log(send)
    } catch (error) {
        
    }
}

export const uploadProjects = async (data) => {
    const {name,url,description,userId} = data
    const formData = new FormData()
    formData.append('data',data)
    try {
        console.log(data)
        const upload = await api.post('/images/upload/user/1/project/',data)
        console.log(upload)
        return upload
    } catch (error) {
        throw error
    }
}