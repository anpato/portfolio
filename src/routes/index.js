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
  updateProject
} from '../controllers/ProjectController'
import { sendContact } from '../services'
// Controller Methods
const Router = ExpressRouter()
/* ============================================= */

// Authentication Routes
Router.post('/auth/sign-up', registerUser)
Router.post('/auth/login', loginUser)
Router.post('/auth/register', registerUser)
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
  authenticate,
  multer({ dest: '../temp', limits: null }).single('project'),
  awsFileUpload,
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

export default Router
