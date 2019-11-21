import { Project } from '../database'

export const handleUpload = async (req, res) => {
  try {
    const project = new Project({
      ...req.body,
      image_url: res.locals.file
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
