import { createTransport } from 'nodemailer'
import 'dotenv/config'

export const sendContact = async (req, res, next) => {
  try {
    let transporter = createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      auth: {
        user: process.env.MAILER,
        pass: process.env.MAILER_PASS
      }
    })
    await transporter.sendMail({
      from: process.env.MAILER,
      to: req.body.email,
      text: `Thanks for reaching out!`
    })
    await transporter.sendMail({
      from: req.body.email,
      to: process.env.MAILER,
      subject: req.body.subject,
      text: 'Message from '
    })
    res.json({
      message1: `Sent mail to ${req.body.email}`,
      message2: `Send mail to ${process.env.MAILER}`
    })
  } catch (error) {
    throw error
  }
}
