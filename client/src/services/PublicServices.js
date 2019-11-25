import { api } from '../config'

export default class PublicService {
  constructor(id, data) {
    this.id = id
    this.data = data
  }
  async getProjects() {
    try {
      const resp = await api.get('/projects')
      return resp.data
    } catch (error) {
      throw error
    }
  }
  async getProject() {
    try {
      const resp = await api.get(`/projects/${this.id}`)
      return resp.data
    } catch (error) {
      throw error
    }
  }
  async getTags() {
    try {
      const resp = await api.get('/tags')
      return resp.data
    } catch (error) {
      throw error
    }
  }
}
