import { createTransport } from 'nodemailer'
import 'dotenv/config'

export const SendUUID = async (uuid, email) => {
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
      from: 'test@mail.com',
      to: email,
      text: `Here is your unqiue key ${uuid}`
    })
    return uuid
  } catch (error) {
    throw error
  }
}
