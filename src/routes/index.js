import { Router as ExpressRouter } from 'express'
// Controllers
import { sendContact } from '../services'
import ProjectRouter from './ProjectRouter'
import AuthRouter from './AuthRouter'

// Controllers

const Router = ExpressRouter()
Router.use('/projects', ProjectRouter)
Router.use('/auth', AuthRouter)

/* ============================================= */
// Tags
Router.get('/tags', projectController.getTags)
// Tags
/* ============================================== */

/* ============================================== */
// Contact Routes
Router.post('/contact', sendContact)
// Contact Routes
/* ============================================== */

export default Router
