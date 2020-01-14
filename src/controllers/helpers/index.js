export default class HelperService {
  checkGif(files) {
    console.log(files)
    const obj = {
      image_gif: '',
      image_static: []
    }
    files.forEach(file => {
      if (typeof file === 'string') {
        if (file.includes('.gif')) {
          Object.assign(obj, { image_gif: file })
        } else {
          obj.image_static.push(file)
        }
      }
    })
    return obj
  }
  async checkTags(tags, Model) {
    const cleanedTags = JSON.parse(tags)
    let returnedTags = []
    for (let i = 0; i < cleanedTags.length; i++) {
      const findTag = await Model.findOne({ name: cleanedTags[i] })
      if (!findTag) {
        const newTag = new Model({ name: cleanedTags[i] })
        await newTag.save()
        returnedTags.push(newTag._id.toString())
      } else {
        returnedTags.push(findTag._id.toString())
      }
    }
    return returnedTags
  }
  parser(data) {
    return JSON.parse(data)
  }
}
