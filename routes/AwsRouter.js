const express = require('express')
const AwsRouter = express.Router()
const AWS = require('aws-sdk');
const Busboy = require('busboy');
const nodeMailer = require('nodemailer')
const {User, Project} = require('../db/models')

const bucket = 'andre-portfolio-projects'
const user_key = process.env.AWS_KEY
const aws_secret = process.env.AWS_SECRET 


const uploadToS3 = (file,url) => {
    let s3Bucket = new AWS.S3({
        accessKeyId: user_key,
        secretAccessKey : aws_secret,
        Bucket : bucket
    });
    s3Bucket.createBucket(() => {
        let params = {
            Bucket : bucket,
            Key : file.name,
            Body : file.data
        };
        s3Bucket.upload(params, (err,data) => {
            if(err){
                console.log(err);
            }
            data.location = url
            return data.location
        })
    })
}


AwsRouter.post('/upload/:id', async (req,res,next) => {
    const file = req.files.element2

    try {
        const findUser = await User.findByPk(req.params.id)

        const busboy = new Busboy({headers:req.headers})
        const element1 = req.body.element1
        await busboy.on('finish', () => {
            uploadToS3(file)
        })
        req.pipe(busboy)
        res.send(findUser)
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

