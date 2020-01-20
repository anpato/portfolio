import { Router as ExpressRouter } from 'express'
import { sendContact } from '../services'
import ProjectRouter from './ProjectRouter'
import AuthRouter from './AuthRouter'
import TagRouter from './TagRouter'

const AppRouter = ExpressRouter()

AppRouter.use('/projects', ProjectRouter)
AppRouter.use('/auth', AuthRouter)
AppRouter.use('/tags', TagRouter)

// Contact Route
AppRouter.post('/contact', sendContact)
// Contact Routes

export default AppRouter
