import { Router as ExpressRouter } from 'express'
import { ProjectController } from '../controllers'
import { AwsController } from '../services'
import AuthController from '../auth'
import multer from 'multer'

const ProjectRouter = ExpressRouter()

const Auth = new AuthController()
const controller = new ProjectController()
const awsController = new AwsController()
const storage = multer.memoryStorage({
  destination: (req, file, cb) => {
    cb(null, '')
  }
})

ProjectRouter.get('/', controller.getProjects)
ProjectRouter.get('/:project_id', controller.getProject)
ProjectRouter.get('/filter/projects', controller.filterProjects)
ProjectRouter.put(
  '/:project_id',
  Auth.Authenticate,
  multer({ storage }).array('projects'),
  awsController.upload,
  controller.updateProject
)
ProjectRouter.post(
  '/',
  Auth.Authenticate,
  multer({ storage }).array('projects'),
  awsController.upload,
  controller.uploadProject
)
ProjectRouter.delete(
  '/:project_id',
  Auth.Authenticate,
  controller.deleteProject,
  awsController.deleteFile
)

export default ProjectRouter
