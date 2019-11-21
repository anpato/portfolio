import 'dotenv/config'
import fs from 'fs'
import awsSdk from 'aws-sdk'

awsSdk.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: 'us-east-1'
})

const s3 = new awsSdk.S3()

export const awsFileUpload = (req, res, next) => {
  const params = {
    ACL: 'public-read',
    Bucket: process.env.AWS_BUCKET,
    Body: fs.createReadStream(req.file.path),
    Key: `project/${new Date().getDate()}-${req.file.originalname}`
  }

  s3.upload(params, (err, data) => {
    if (err) throw err
    if (data) {
      fs.unlinkSync(req.file.path)
      res.locals.file = data.Location
      next()
    }
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
