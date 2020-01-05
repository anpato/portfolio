import Axios from 'axios'
import { getToken } from '../services/TokenService'
const { REACT_APP_PRODUCTION } = process.env
export const api = Axios.create({
  baseURL:
    window.location.hostname === 'localhost'
      ? 'http://localhost:3001/api'
      : REACT_APP_PRODUCTION,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
})

api.interceptors.request.use(
  config => {
    const token = getToken()
    if (token !== null) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  err => Promise.reject(err)
)
