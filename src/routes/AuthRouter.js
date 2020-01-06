import { Router as ExpressRouter } from 'express'
import { UserController } from '../controllers'
const AuthRouter = ExpressRouter()

const controller = new UserController()

AuthRouter.post('/sign-up', controller.registerUser)
AuthRouter.post('/login', controller.loginUser)
AuthRouter.post('/register', controller.registerUser)

export default AuthRouter
