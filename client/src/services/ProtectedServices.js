import { api } from '../config'
import { getToken, setToken } from '../services/TokenService'

export default class ProtectedServices {
  constructor(id, user) {
    this.id = id
    this.user = user
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
}
