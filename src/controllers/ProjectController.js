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
      const images = req.files.length
        ? this.Helpers.checkGif(res.locals.files)
        : null
      const tags = await this.Helpers.checkTags(req.body.tags, Tag)
      const projectBody = this.Helpers.parser(req.body.project)
      const project = new Project({
        ...projectBody,
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
      const imagesFromFiles = req.files.length
        ? this.Helpers.checkGif(res.locals.files)
        : null
      const images = req.files.length
        ? null
        : this.Helpers.checkGif([req.body.projects])
      const projectBody = JSON.parse(req.body.project)
      const project = await Project.findById(req.params.project_id)
      await Project.findOneAndUpdate(
        { _id: req.params.project_id },
        {
          ...projectBody,
          tags: await this.Helpers.checkTags(req.body.tags, Tag),
          images: req.files.length ? imagesFromFiles : images
        },
        { upsert: true }
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
