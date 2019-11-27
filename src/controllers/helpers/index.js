export default class HelperService {
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
