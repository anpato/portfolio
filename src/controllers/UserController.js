import { User } from '../database'
import AuthService from '../auth'

class UserController {
  constructor() {
    this.Authenticate = new AuthService()
  }
  async loginUser(req, res) {
    try {
      const user = await User.findOne({ username: req.body.username })
      if (await this.Authenticate.VerifyPassword(user, req.body.password)) {
        const payload = {
          _id: user._id,
          name: user.name,
          email: user.email
        }
        const token = this.Authenticate.SignToken(payload)
        res.status(200).send({ payload, token })
      } else {
        res.status(401).json({ error: 'Token Invalid' })
      }
    } catch (error) {
      res.status(401).json({ error: 'Token Invalid' })
    }
  }

  async registerUser(req, res) {
    try {
      const { name, email, username, password } = req.body
      const password_digest = await this.Authenticate.HashPassword(
        password,
        res
      )

      const user = new User({
        name,
        username,
        email,
        password_digest
      })

      const payload = {
        _id: user._id,
        name: user.name,
        username: user.username
      }
      const token = this.Authenticate.SignToken(payload)
      if (token) {
        await user.save()
        res.json({ payload, token })
      }
    } catch (error) {
      res.status(500).json({ error: error.message.split(':')[0] })
    }
  }

  async loginUser(req, res) {
    try {
      const user = await User.findOne({ username: req.body.username })
      if (await this.Authenticate.VerifyPassword(user, req.body.password)) {
        const payload = {
          _id: user._id,
          name: user.name,
          email: user.email
        }
        const token = this.Authenticate.SignToken(payload)
        res.status(200).send({ payload, token })
      } else {
        res.status(401).json({ error: 'Token Invalid' })
      }
    } catch (error) {
      res.status(401).json({ error: 'Token Invalid' })
    }
  }

  async registerUser(req, res) {
    try {
      const { name, email, username, password } = req.body
      const password_digest = await this.Authenticate.HashPassword(
        password,
        res
      )

      const user = new User({
        name,
        username,
        email,
        password_digest
      })

      const payload = {
        _id: user._id,
        name: user.name,
        username: user.username
      }
      const token = this.Authenticate.SignToken(payload)
      if (token) {
        await user.save()
        res.json({ payload, token })
      }
    } catch (error) {
      res.status(500).json({ error: error.message.split(':')[0] })
    }
  }
}

export { UserController }
