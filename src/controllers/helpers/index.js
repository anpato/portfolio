export default class HelperService {
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
}
