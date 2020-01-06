import { Router as ExpressRouter } from 'express'
import { sendContact } from '../services'
import ProjectRouter from './ProjectRouter'
import AuthRouter from './AuthRouter'
import TagRouter from './TagROuter'

const Router = ExpressRouter()

Router.use('/projects', ProjectRouter)
Router.use('/auth', AuthRouter)
Router.use('/tags', TagRouter)

// Contact Route
Router.post('/contact', sendContact)
// Contact Routes

export default Router
