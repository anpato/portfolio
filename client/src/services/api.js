const Axios = require('axios');
const S3FileUpload = require('react-s3');
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

export const uploadProjects = async (data) => {
    try {
        const upload = await api.post('/images/upload/user/1/project/',data)
        return upload
    } catch (error) {
        throw error
    }
}