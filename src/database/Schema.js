import { model } from 'mongoose'
import { UserModel, ProjectModel, TagModel } from './models'

export const User = model('users', UserModel)
export const Project = model('projects', ProjectModel)
export const Tag = model('tags', TagModel)
