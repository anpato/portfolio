import 'dotenv/config'
import awsSdk from 'aws-sdk'

class AwsHelpers {
  constructor() {
    this.title = ''
    this.generateSubFolder = this.generateSubFolder.bind(this)
    this.dataParser = this.dataParser.bind(this)
    this.getKeys = this.getKeys.bind(this)
    this.setParams = this.setParams.bind(this)
  }
  generateSubFolder(title) {
    return title
      .split(' ')
      .join('-')
      .toLowerCase()
  }
  dataParser(data) {
    return JSON.parse(data)
  }

  getKeys(data) {
    let existingFiles = []
    for (let i = 0; i < data.length; i++) {
      if (data[i].Key.includes('project')) {
        existingFiles.push(data[i].Key)
      }
    }
    return existingFiles
  }

  setParams(file, subFolder) {
    let params = {
      ACL: 'public-read',
      Bucket: process.env.AWS_BUCKET,
      Body: file.buffer,
      Key: `project/${subFolder}/${file.originalname}`
    }
    return params
  }
}
class AwsController {
  constructor() {
    this.files = []
    this.file = null
    this.s3 = new awsSdk.S3()
    this.Helpers = new AwsHelpers()
    this.date = new Date().getTime()
    this.pushKeys = this.Helpers.getKeys
    this.deleteFile = this.deleteFile.bind(this)
    this.params = null
    this.s3.config.update({
      accessKeyId: process.env.AWS_KEY,
      secretAccessKey: process.env.AWS_SECRET,
      region: 'us-east-1'
    })
  }

  upload = (req, res, next) => {
    const project = this.Helpers.dataParser(req.body.project)
    const subFolder = this.Helpers.generateSubFolder(project.title)

    if (req.files.length) {
      req.files.map(file => {
        let params = {
          ACL: 'public-read',
          Bucket: process.env.AWS_BUCKET,
          Body: file.buffer,
          Key: `project/${subFolder}/${this.date}-${file.originalname}`
        }
        this.s3.upload(params, (err, data) => {
          if (err) throw err
          this.files.push(data.Location)
          if (this.files.length === req.files.length) {
            res.locals.files = this.files
            next()
          }
        })
      })
    } else {
      next()
    }
  }
  deleteFile = (req, res, file) => {
    this.params = this.Helpers.setParams(file)
    this.s3.deleteObject(this.params, (err, data) => {
      if (err) console.log(err)
      else {
        console.log(data)
      }
    })
  }
}

export { AwsController }
