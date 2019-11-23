import { Project } from '../database'
const checkGif = files => {
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

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
    res.send(projects)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const filterProjects = async (req, res) => {
  try {
    const project = await Project.find({ released: req.query.released })
    res.send(project)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.project_id)
    res.send(project)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const updateProject = async (req, res) => {
  try {
    await Project.updateOne({ _id: req.params.project_id }, req.body)
    const project = await Project.findById(req.params.project_id)
    res.send(project)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const uploadProject = async (req, res) => {
  try {
    const images = checkGif(res.locals.files)
    const project = new Project({
      ...req.body,
      images
    })
    await project.save()
    res.send(project)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteProject = async (req, res, next) => {
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
