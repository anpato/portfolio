import 'dotenv/config'
import fs from 'fs'
import awsSdk, { DataExchange } from 'aws-sdk'

const pushKeys = data => {
  let existingFiles = []
  for (let i = 0; i < data.length; i++) {
    if (data[i].Key.includes('project')) {
      existingFiles.push(data[i].Key)
    }
  }
  return existingFiles
}
// const compareFiles

awsSdk.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: 'us-east-1'
})

const s3 = new awsSdk.S3()

export const awsFileUpload = (req, res, next) => {
  const date = new Date().getTime()
  const project = JSON.parse(req.body.project)
  console.log(req.files)
  const subFolder = project.title
    .split(' ')
    .join('-')
    .toLowerCase()
  const files = []
  if (req.files.length) {
    req.files.map(file => {
      const params = {
        ACL: 'public-read',
        Bucket: process.env.AWS_BUCKET,
        Body: file.buffer,
        Key: `project/${subFolder}/${date}-${file.originalname}`
      }
      let existingFiles = []
      s3.listObjects(
        { Bucket: process.env.AWS_BUCKET, Prefix: `project/${subFolder}` },
        (err, data) => {
          if (err) {
            throw error
          } else {
            const returnedKeys = pushKeys(data.Contents)
            existingFiles = [...existingFiles, ...returnedKeys]
            if (existingFiles.includes(params)) {
              existingFiles.forEach(file => awsFileRemove(null, res, file))
            } else {
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
            }
          }
        }
      )
    })
  } else {
    console.log('made it')
    next()
  }
}

const awsFileRemove = (req, res, file) => {
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: `project/${res.locals.filename}` || file
  }
  s3.deleteObject(params, (err, data) => {
    if (err) console.log(err)
    else {
      console.log(data)
      // res.json({ message: `${data} was deleted.` })
    }
  })
}

export { awsFileRemove }
