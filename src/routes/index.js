import { Router as ExpressRouter } from 'express'
import multer from 'multer'

// Controllers
import { awsFileUpload, awsFileRemove } from '../services/AwsUpload'
import { sendContact } from '../services'
import { ProjectController, UserController } from '../controllers/'
import AuthController from '../auth'
// Controllers

const Router = ExpressRouter()
const storage = multer.memoryStorage({
  destination: (req, file, cb) => {
    cb(null, '')
  }
})

/* ============================================= */
// Initialize controllers
const authController = new AuthController()
const userController = new UserController()
const projectController = new ProjectController()
// Initialize controllers
/* ============================================= */

/* ============================================= */
// Authentication Routes
Router.post('/auth/sign-up', userController.registerUser)
Router.post('/auth/login', userController.loginUser)
Router.post('/auth/register', userController.registerUser)
Router.get('/auth/verify', authController.VerifyToken)
// Authentication Routes
/* ============================================= */

/* ============================================= */
// Project Routes
Router.get('/projects', projectController.getProjects)
Router.get('/projects/:project_id', projectController.getProject)
Router.get('/projects/filter/released', projectController.filterProjects)
Router.put(
  '/projects/:project_id',
  authController.Authenticate,
  multer({ storage }).array('projects'),
  awsFileUpload,
  projectController.updateProject
)
Router.post(
  '/projects',
  // authController.Authenticate,
  multer({ storage }).array('projects'),
  awsFileUpload,
  projectController.uploadProject
)
Router.delete(
  '/projects/:project_id',
  authController.Authenticate,
  projectController.deleteProject,
  awsFileRemove
)
// Project Routes
/* ============================================= */

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
