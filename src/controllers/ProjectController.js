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

export const updateProject = async (req, res) => {
  try {
    const images = req.files.length ? checkGif(res.locals.files) : null

    const project = await Project.findById(req.params.project_id)
    await Project.updateOne(
      { _id: req.params.project_id },
      {
        ...req.body.project,
        tags: await checkTags(req.body.tags),
        images: req.files.length ? images : project.images
      }
    )

    res.send(project)
  } catch (error) {
    res.status(500).json({ error: error })
    throw error
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

export const getTags = async (req, res) => {
  try {
    const tags = await Tag.find()
    res.send(tags)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
