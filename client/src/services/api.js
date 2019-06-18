const Axios = require('axios');
const JwtToken = 'token';
const BASE_URL = 'http://localhost:3001';
const DEPLOY_URL = 'https://andre-pato-portfolio.herokuapp.com/'
const api = Axios.create({
    baseURL : DEPLOY_URL,
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

export const deleteProject = async (id) => {
    try {
        const remove = await api.delete(`projects/${id}`);
        return remove
    } catch (error) {
        throw error
    }
}

export const contact = async (data) => {
    try {
        const resp = await api.post('/contact', data)
        return resp
    } catch (error) {
        throw error
    }
}