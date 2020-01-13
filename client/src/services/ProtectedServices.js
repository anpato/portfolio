import { api } from '../config'
import { setToken } from '../services/TokenService'

export default class ProtectedServices {
  constructor(id, user, data, token) {
    this.id = id
    this.user = user
    this.token = token
    this.data = data
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
      return resp.status
    } catch (error) {
      throw error
    }
  }
  async uploadProject(data) {
    try {
      const resp = await api.post('/projects', data)
      return resp.status
    } catch (error) {
      throw error
    }
  }
  async updateProject() {
    try {
      const resp = await api.put(`/projects/${this.id}`, this.data)
      return resp
    } catch (error) {
      throw error
    }
  }
}
