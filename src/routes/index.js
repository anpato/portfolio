import { Router as ExpressRouter } from 'express'
import multer from 'multer'
// token verification middleware
import { authenticate, verifyToken } from '../auth'
// token verification middleware

// Controller Methods
import { awsFileUpload, awsFileRemove } from '../services/AwsUpload'
import { registerUser, loginUser } from '../controllers/UserController'
import { sendContact } from '../services'
import ProjectController from '../controllers/ProjectController'
// Controller Methods
const Router = ExpressRouter()
const storage = multer.memoryStorage({
  destination: (req, file, cb) => {
    cb(null, '')
  }
})
/* ============================================= */

// Authentication Routes
Router.post('/auth/sign-up', registerUser)
Router.post('/auth/login', loginUser)
Router.post('/auth/register', registerUser)
Router.get('/auth/verify', verifyToken)
// Authentication Routes

/* ============================================= */

/* ============================================= */
// Project Routes
const projectController = new ProjectController()
Router.get('/projects', projectController.getProjects)
Router.get('/projects/:project_id', projectController.getProject)
Router.get('/projects/filter/released', projectController.filterProjects)
Router.put(
  '/projects/:project_id',
  authenticate,
  multer({ storage }).array('projects'),
  awsFileUpload,
  projectController.updateProject
)
Router.post(
  '/projects',
  // authenticate,
  multer({ storage }).array('projects'),
  awsFileUpload,
  projectController.uploadProject
)
Router.delete(
  '/projects/:project_id',
  authenticate,
  projectController.deleteProject,
  awsFileRemove
)

// Tags
Router.get('/tags', projectController.getTags)
// Tags
// Project Routes

/* ============================================== */

// Contact Routes
Router.post('/contact', sendContact)
// Contact Routes

/* ============================================== */

export default Router
