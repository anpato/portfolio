import Axios from 'axios'
import { getToken } from '../services/TokenService'
const { REACT_APP_LOCAL, REACT_APP_PRODUCTION } = process.env
const token = getToken()
export const api = Axios.create({
  baseURL:
    window.location.hostname === 'localhost'
      ? REACT_APP_LOCAL
      : REACT_APP_PRODUCTION,
  headers: {
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${token}`
  }
})
