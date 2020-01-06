import { api } from '../config'

export default class PublicService {
  async contact(data) {
    try {
      const resp = await api.post('/contact', data)
      return resp
    } catch (error) {
      throw error
    }
  }
  async getProjects() {
    try {
      const resp = await api.get('/projects')
      return resp.data
    } catch (error) {
      throw error
    }
  }
  async getProject(id) {
    try {
      const resp = await api.get(`/projects/${id}`)
      return resp.data
    } catch (error) {
      throw error
    }
  }
  async filterProjects(query, name) {
    try {
      const resp = await api.get(`/projects/filter/projects?${query}=${name}`)
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
