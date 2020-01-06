import 'dotenv/config'

export const PORT = process.env.PORT || process.env.LOCAL_PORT
export const TOKEN_KEY = process.env.TOKEN_KEY
export const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS)
export const AWS_SECRET = process.env.AWS_SECRET
export const AWS_KEY = process.env.AWS_KEY
export const AWS_BUCKET = process.env.AWS_BUCKET
export const MAILER = process.env.MAILER
export const MAILER_PASS = process.env.MAILER_PASS
export const DEVELOP_URI = process.env.DEVELOP_URI
export const DATABASE_URI = process.env.DATABASE_URI
export const APP_SECRET = process.env.APP_SECRET
