import { createTransport } from 'nodemailer'
import 'dotenv/config'

export const sendContact = async (req, res, next) => {
  console.log(req.body)
  let transporter = createTransport({
    host: 'smtp.gmail.com',
    secure: true,
    auth: {
      user: process.env.MAILER,
      pass: process.env.MAILER_PASS
    }
  })
  await transporter.sendMail(
    {
      from: process.env.MAILER,
      to: req.body.email,
      text: `Thanks for reaching out!`
    },
    (err, info) => {
      if (err) res.status(500).json({ err })
      else {
        res.json({
          message: `Sent mail to ${req.body.email}`
        })
      }
    }
  )
  await transporter.sendMail(
    {
      from: req.body.email,
      to: process.env.MAILER,
      subject: req.body.subject,
      text: `Message from ${req.body.email} `
    },
    (err, info) => {
      if (err) res.status(500).json({ err })
      else {
        res.json({
          message: `Send mail to ${process.env.MAILER}`
        })
      }
    }
  )
}
