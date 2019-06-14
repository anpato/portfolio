const express = require('express')
const nodeMailer = require('nodemailer')
const contactRouter = express.Router();

contactRouter.post('/', async(req,res) => {
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

module.exports = contactRouter