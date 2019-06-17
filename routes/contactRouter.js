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
            from: req.body.from,
            to : process.env.MAILER_EMAIL,
            subject: req.body.subject,
            text: req.body.text
        })
        res.send(info);
    } catch(error) {
        throw error
    }
})

module.exports = contactRouter