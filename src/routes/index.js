import { Router as ExpressRouter } from 'express'
import multer from 'multer'
// token verification middleware
import { authenticate, verifyToken } from '../auth'
// token verification middleware

// Controller Methods
import {
  registerUser,
  loginUser,
  verifyUser,
  handleUpload,
  deleteProject
} from '../controllers/'
import { awsFileUpload, awsFileRemove } from '../services/AwsUpload'

// Controller Methods
const Router = ExpressRouter()
// Authentication Routes
Router.post('/auth/sign-up', registerUser)
Router.post('/auth/login', loginUser)
Router.post('/auth/register', registerUser)
// Authentication Routes

/* ============================================= */

/* ============================================= */
Router.post(
  '/projects',
  authenticate,
  multer({ dest: '../temp', limits: null }).single('project'),
  awsFileUpload,
  handleUpload
)
Router.delete(
  '/projects/:project_id',
  authenticate,
  deleteProject,
  awsFileRemove
)
/* ============================================== */

export default Router
