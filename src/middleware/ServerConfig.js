import bodyParser from 'body-parser'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'

export default [
  helmet(),
  logger('dev'),
  cookieParser(),
  cors(),
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json()
]
