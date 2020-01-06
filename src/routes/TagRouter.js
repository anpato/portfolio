import { Router as ExpressRouter } from 'express'
import { ProjectController } from '../controllers'

const TagRouter = ExpressRouter()
const controller = new ProjectController()
TagRouter.get('/', controller.getTags)

export default TagRouter
