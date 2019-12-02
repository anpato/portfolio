import 'dotenv/config'
import express from 'express'
import { connect, connection } from 'mongoose'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'
import { db } from './config'
import Router from './routes'
import { genID } from './services'

const App = express()
const sameSite = process.argv[2] || true
const PORT = process.env.PORT || process.env.LOCAL_PORT
App.use('/api', Router)
App.use(helmet())
App.disable('x-powered-by')
App.use(logger('dev'))
App.use(cookieParser())
App.use(cors())
App.use(bodyParser.urlencoded({ extended: true }))
App.use(bodyParser.json())
// App.locals.sessionID = genID()
// Mongodb Connection
connect(db().connect, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
})
connection.once('open', () => {
  console.log(`connected to ${db().name}`)
})
// Mongodb Connection
App.get('/', (req, res) =>
  res
    .status(200)
    .cookie('sessionID', App.locals.sessionID, { sameSite: sameSite })
    .json({ msg: 'Portfolio' })
)

App.listen(PORT)

export default App
