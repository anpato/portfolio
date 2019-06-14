const express = require('express')
const AwsRouter = express.Router()
const AWS = require('aws-sdk');
const Busboy = require('busboy');
const nodeMailer = require('nodemailer')
const {User, Project} = require('../db/models')

const bucket = 'andre-portfolio-projects'
const user_key = process.env.AWS_KEY
const aws_secret = process.env.AWS_SECRET 




AwsRouter.post('/upload/user/:id/project/', async (req,res,next) => {
    try {
        const file = req.files.image
        const userId = req.params.id
        const uploadToS3 = (file) => {
            let s3Bucket = new AWS.S3({
                accessKeyId: user_key,
                secretAccessKey : aws_secret,
                Bucket : bucket,
                file : file
                
            });
            s3Bucket.createBucket(() => {
                let params = {
                    Bucket : bucket,
                    Key : file.name,
                    Body : file.data
                };
                s3Bucket.upload(params,async  (err,data) => {
                    if(err){
                        throw err
                    }
                    console.log(userId)
                    const params = {
                        name: req.body.name,
                        description: req.body.description,
                        image: data.Location,
                        url : req.body.url
                    }

                    const project = await Project.create(params)
                    await project.setUser(userId)
                    res.send(project)
                })
            })
        }
        uploadToS3(file)
    } catch (error) {
        res.send({msg:'Upload failed'})
        throw error
    }
});

AwsRouter.post('/', async(req,res) => {
    try{
        let transporter = nodeMailer.createTransport({
            host : 'smtp.gmail.com',
            auth : {
                user : process.env.MAILER_EMAIL,
                pass: process.env.MAILER_PASS
            }
        });

        let info = await transporter.sendMail({
            from: process.env.MAILER_EMAIL,
            to : req.body.to,
            subject: req.body.subject,
            text: req.body.text
        })
        console.log('sent', info.messageId);
        res.send(info);
    } catch(error) {
        throw error
    }
})

module.exports = AwsRouter

