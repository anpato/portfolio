import { Project, Tag } from '../database'
import HelperService from './helpers'

class ProjectController {
  constructor() {
    this.Helpers = new HelperService()
  }

  getProjects = async (req, res) => {
    try {
      await Project.find()
        .populate('tags')
        .exec((err, projects) => {
          if (err) res.status(500).json({ error: err })
          else {
            res.send(projects)
          }
        })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  filterProjects = async (req, res) => {
    try {
      const value = Object.values(req.query)[0]
      const query = Object.keys(req.query)[0]
      await Project.find({ [query]: value })
        .populate({
          path: 'tags'
        })
        .exec((err, data) => {
          if (err) throw err
          res.send(data)
        })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  getProject = async (req, res) => {
    try {
      await Project.findById(req.params.project_id)
        .populate('tags')
        .exec((err, project) => {
          if (err) throw err
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
      const images = await this.Helpers.checkGif(res.locals.files)
      const tags = await this.Helpers.checkTags(req.body.tags, Tag)
      const projectBody = this.Helpers.parser(req.body.project)
      const project = new Project({
        ...projectBody,
        ...images
        // tags
      })
      project.save()
      res.send(project)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  updateProject = async (req, res) => {
    try {
      const projectBody = JSON.parse(req.body.project)
      const images = this.Helpers.checkGif(res.locals.files)
      delete projectBody.images
      await Project.findOneAndUpdate(
        req.params.project_id,
        {
          ...projectBody,
          image_gif: images.image_gif,
          image_static: images.image_static
        },
        { new: true },
        (err, doc) => {
          console.log(doc)
          res.send(doc)
        }
      )
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
