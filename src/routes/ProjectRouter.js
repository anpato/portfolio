import { Router as ProjectRouter } from 'express'
import { ProjectController } from '../controllers'
import { AwsController } from '../services'
import AuthController from '../auth'
import multer from 'multer'

const Auth = new AuthController()
const controller = new ProjectController()
const awsController = new AwsController()
const storage = multer.memoryStorage({
  destination: (req, file, cb) => {
    cb(null, '')
  }
})

ProjectRouter.get('/projects', controller.getProjects)
ProjectRouter.get('/projects/:project_id', controller.getProject)
ProjectRouter.get('/projects/filter/projects', controller.filterProjects)
ProjectRouter.put(
  '/projects/:project_id',
  Auth.Authenticate,
  multer({ storage }).array('projects'),
  awsController.upload,
  controller.updateProject
)
ProjectRouter.post(
  '/projects',
  Auth.Authenticate,
  multer({ storage }).array('projects'),
  awsController.upload,
  controller.uploadProject
)
ProjectRouter.delete(
  '/projects/:project_id',
  Auth.Authenticate,
  controller.deleteProject,
  awsController.deleteFile
)

export default ProjectRouter
