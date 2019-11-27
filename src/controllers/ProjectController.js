import { Project, Tag } from '../database'

class Helpers {
  constructor() {
    this.checkGif = this.checkGif.bind(this)
    this.checkTags = this.checkTags.bind(this)
  }

  checkGif(files) {
    const obj = {
      gif: '',
      static: []
    }
    files.forEach(file => {
      if (file.includes('.gif')) {
        Object.assign(obj, { gif: file })
      } else {
        obj.static.push(file)
      }
    })
    return obj
  }
  async checkTags(tags) {
    const cleanedTags = JSON.parse(tags)
    let returnedTags = []
    for (let i = 0; i < cleanedTags.length; i++) {
      const findTag = await Tag.findOne({ name: cleanedTags[i] })
      if (!findTag) {
        const newTag = new Tag({ name: cleanedTags[i] })
        await newTag.save()
        returnedTags.push(newTag._id.toString())
      } else {
        returnedTags.push(findTag._id.toString())
      }
    }
    return returnedTags
  }
}
class ProjectController {
  constructor() {
    this.Helper = new Helpers()
  }

  async getProjects(req, res) {
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
  async filterProjects(req, res) {
    try {
      const project = await Project.find({ released: req.query.released })
      res.send(project)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
  async getProject(req, res) {
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

  async uploadProject(req, res) {
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

  async updateProject(req, res) {
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
  async deleteProject(req, res, next) {
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
  async getTags(req, res) {
    try {
      const tags = await Tag.find()
      res.send(tags)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

export { ProjectController }
