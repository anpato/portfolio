import 'dotenv/config'
import fs from 'fs'
import awsSdk, { DataExchange } from 'aws-sdk'

awsSdk.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: 'us-east-1'
})

const s3 = new awsSdk.S3()

export const awsFileUpload = (req, res, next) => {
  const date = new Date().getTime()
  const files = []
  req.files.map(file => {
    const params = {
      ACL: 'public-read',
      Bucket: process.env.AWS_BUCKET,
      Body: file.buffer,
      Key: `project/${date}-${file.originalname}`
    }
    s3.upload(params, (err, data) => {
      if (err) throw err
      if (data) {
        files.push(data.Location)
        if (files.length === req.files.length) {
          res.locals.files = files
          next()
        }
      }
    })
  })
}

export const awsFileRemove = (req, res) => {
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: `project/${res.locals.filename}`
  }
  s3.deleteObject(params, (err, data) => {
    if (err) console.log(err)
    else {
      console.log(res.locals.filename, data)
      res.json({ message: `${res.locals.projectname} was deleted.` })
    }
  })
}
