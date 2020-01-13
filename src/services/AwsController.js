import awsSdk from 'aws-sdk'
import { AWS_KEY, AWS_SECRET, AWS_BUCKET } from '../env'
class AwsHelpers {
  constructor() {
    this.title = ''
    this.date = new Date().getTime()
  }
  generateSubFolder = title => {
    return title
      .split(' ')
      .join('-')
      .toLowerCase()
  }
  dataParser(data) {
    return JSON.parse(data)
  }

  uploadFiles = async (file, subfolder, s3) => {
    let location

    console.log(location)
  }

  getKeys = data => {
    let existingFiles = []
    for (let i = 0; i < data.length; i++) {
      if (data[i].Key.includes('project')) {
        existingFiles.push(data[i].Key)
      }
    }
    return existingFiles
  }

  setParams = (file, subFolder) => {
    let params = {
      ACL: 'public-read',
      Bucket: AWS_BUCKET,
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
    this.s3.config.update({
      accessKeyId: AWS_KEY,
      secretAccessKey: AWS_SECRET,
      region: 'us-east-1'
    })
  }

  upload = async (req, res, next) => {
    const project = this.Helpers.dataParser(req.body.project)
    const subfolder = this.Helpers.generateSubFolder(project.title)
    if (req.files.length) {
      await req.files.forEach(async file => {
        const params = this.Helpers.setParams(file, subfolder)
        await this.s3.upload(params, (err, data) => {
          if (err) throw err
          this.files.push(data.Location)
          if (this.files.length === req.files.length)
            this.sendFiles(this.files, res, next)
        })
      })
    }
  }

  sendFiles = (files, res, next) => {
    res.locals.files = files
    next()
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
