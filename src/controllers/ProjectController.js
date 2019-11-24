import { Project, Tag } from '../database'
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

const checkTags = async tags => {
  let returnedTags = []
  for (let i = 0; i < tags.length; i++) {
    const findTag = await Tag.findOneAndUpdate(
      { name: req.body.tags[i] },
      { expire: new Date() },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
      }
    )
    returnedTags.push(findTag._id.toString())
  }
  return returnedTags
}

export const getProjects = async (req, res) => {
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

    const tags = await checkTags(req.body.tags)
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

export const addTag = async (req, res) => {
  try {
    const tags = checkTags(req.body.tags)
    res.send(tags)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
