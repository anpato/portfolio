import { Router as ExpressRouter } from 'express'
import multer from 'multer'

// Controllers
import { AwsController, sendContact } from '../services'
import { ProjectController, UserController } from '../controllers/'
import AuthController from '../auth'
// Controllers

const Router = ExpressRouter()

/* ============================================= */
// Multer Config
const storage = multer.memoryStorage({
  destination: (req, file, cb) => {
    cb(null, '')
  }
})
// Multer Config
/* ============================================= */

/* ============================================= */
// Initialize controllers
const authController = new AuthController()
const userController = new UserController()
const awsController = new AwsController()
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
  awsController.upload,
  projectController.updateProject
)
Router.post(
  '/projects',
  authController.Authenticate,
  multer({ storage }).array('projects'),
  awsController.upload,
  projectController.uploadProject
)
Router.delete(
  '/projects/:project_id',
  authController.Authenticate,
  projectController.deleteProject,
  awsController.deleteFile
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
