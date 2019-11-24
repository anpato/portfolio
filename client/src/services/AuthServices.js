import { api } from '../config'
import { getToken } from './TokenService'

export const _LoginUser = async user => {
  try {
    const resp = await api.post('/auth/login', user)
    return {
      user: resp.data.payload,
      token: resp.data.token
    }
  } catch (error) {
    throw error
  }
}

export const _VerifyToken = async () => {
  try {
    const token = await getToken()
    return token
  } catch (error) {
    throw error
  }
}
