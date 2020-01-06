import { Router as ExpressRouter } from 'express'
import { UserController } from '../controllers'
const AuthRouter = ExpressRouter()

const controller = new UserController()

AuthRouter.post('/auth/sign-up', controller.registerUser)
AuthRouter.post('/auth/login', controller.loginUser)
AuthRouter.post('/auth/register', controller.registerUser)

export default AuthRouter
