import crypto from 'crypto'
import 'dotenv/config'
import App from '../server'

export const compare = req => {
  return crypto.timingSafeEqual(
    Buffer.from(req.cookies.sessionID),
    Buffer.from(App.locals.sessionID)
  )
}

export const genID = () => {
  return crypto
    .randomBytes(parseInt(process.env.RANDOMBYTES))
    .toString('base64')
}
