import { Project, Tag } from '../database'
import HelperService from './helpers'
class ProjectController {
  constructor() {
    this.Helper = new HelperService()
  }

  getProjects = async (req, res) => {
    try {
      await Project.find()
        .populate('tags')
        .exec((err, data) => {
          if (err) res.status(500).json({ error: err })
          else {
            res.send(data)
          }
        })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
  filterProjects = async (req, res) => {
    try {
      const project = await Project.find({ released: req.query.released })
      res.send(project)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
  getProject = async (req, res) => {
    try {
      await Project.findById(req.params.project_id)
        .populate('tags')
        .exec((err, project) => {
          if (err) res.status(500).json({ error: error.message })
          else {
            res.send(project)
          }
        })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  uploadProject = async (req, res) => {
    try {
      const images = this.Helpers.checkGif(res.locals.files)
      const tags = await this.Helpers.checkTags(req.body.tags)
      const project = new Project({
        ...req.body.project,
        images,
        tags
      })
      await project.save()
      res.send(project)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  updateProject = async (req, res) => {
    try {
      const images = req.files.length ? this.checkGif(res.locals.files) : null
      const projectBody = JSON.parse(req.body.project)
      console.log(projectBody)
      const project = await Project.findById(req.params.project_id)
      await Project.updateOne(
        { _id: req.params.project_id },
        {
          ...projectBody,
          tags: await this.checkTags(req.body.tags),
          images: req.files.length ? images : project.images
        }
      )
      res.send(project)
    } catch (error) {
      res.status(500).json({ error: error })
      throw error
    }
  }
  deleteProject = async (req, res, next) => {
    try {
      const project = await Project.findById(req.params.project_id)
      const image = project.image_url.split('/')
      res.locals.filename = image[image.length - 1]
      res.locals.projectname = project.title
      await project.remove()
      next()
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
  getTags = async (req, res) => {
    try {
      const tags = await Tag.find()
      res.send(tags)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

export { ProjectController }
