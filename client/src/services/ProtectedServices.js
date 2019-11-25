import { api } from '../config'
import { getToken, setToken } from '../services/TokenService'

export default class ProtectedServices {
  constructor(id, user, token) {
    this.id = id
    this.user = user
    this.token = token
  }

  async handleLogin() {
    try {
      const resp = await api.post('/auth/login', this.user)
      setToken(resp.data.token)
      return resp.status
    } catch (error) {
      throw error
    }
  }
  async verifyToken() {
    try {
      const resp = await api.get('/auth/verify', this.token)
      console.log(resp.status)
      return resp.status
    } catch (error) {
      throw error
    }
  }
}
