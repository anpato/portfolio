import express from 'express'
import middleWare from './config/ServerConfig'
import Router from './routes'
import { db } from './config'
import { connect, connection } from 'mongoose'
import { PORT } from './env'

class App {
  constructor(port, middleWare, database, baseRoute) {
    this.app = express()
    this.port = port
    this.middleWare = middleWare
    this.database = database
    this.baseRoute = baseRoute
  }
  get() {
    this.app.get(this.baseRoute, (req, res) => res.json({ mdg: 'Portfolio' }))
  }

  listen() {
    this.app.listen(this.port, () =>
      console.info(`App Started on ${this.port}`)
    )
  }

  init_middleWare() {
    this.middleWare.forEach(tool => this.app.use(tool))
  }
  init_routes() {
    this.app.use('/api', Router)
  }
  connectDB() {
    connect(this.database().connection, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
    connection.once('open', () => {
      console.log(`connected to ${this.database().name}`)
    })
  }
  initialize() {
    this.app.disable('x-powered-by')
    this.init_middleWare()
    this.init_routes()
    this.connectDB()
    this.listen()
  }
}

const app = new App(PORT, middleWare, db, '/')

app.initialize()
