import { Router as ExpressRouter } from 'express'
import multer from 'multer'
// token verification middleware
import { authenticate, verifyToken } from '../auth'
// token verification middleware

// Controller Methods
import { awsFileUpload, awsFileRemove } from '../services/AwsUpload'
import { registerUser, loginUser } from '../controllers/UserController'

import {
  uploadProject,
  deleteProject,
  getProjects,
  getProject,
  filterProjects,
  updateProject,
  getTags
} from '../controllers/ProjectController'
import { sendContact } from '../services'
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
Router.get('/projects', getProjects)
Router.get('/projects/:project_id', getProject)
Router.get('/projects/filter/released', filterProjects)
Router.put('/projects/:project_id', authenticate, updateProject)
Router.post(
  '/projects',
  // authenticate,
  // multer({ storage }).array('project'),
  // awsFileUpload,
  uploadProject
)
Router.delete(
  '/projects/:project_id',
  authenticate,
  deleteProject,
  awsFileRemove
)
// Project Routes

/* ============================================== */

// Contact Routes
Router.post('/contact', sendContact)
// Contact Routes

/* ============================================== */

// Tags
Router.get('/tags', getTags)
// Tags

export default Router
