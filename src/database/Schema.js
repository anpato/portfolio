import { model } from 'mongoose'
import { UserModel, ProjectModel } from './models'

export const User = model('users', UserModel)
export const Project = model('projects', ProjectModel)
