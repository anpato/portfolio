import { User } from '../database'
import {
  signToken,
  HashPassword,
  VerifyPassword,
  verifySecret,
  hashSecret
} from '../auth'

import { SendUUID, UUID } from '../services/'

export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (await VerifyPassword(user, req.body.password)) {
      const payload = {
        _id: user._id,
        name: user.name,
        email: user.email
      }
      const token = signToken(payload)
      res.status(200).send({ payload, token })
    } else {
      res.status(401).json({ error: 'Token Invalid' })
    }
  } catch (error) {
    res.status(401).json({ error: 'Token Invalid' })
  }
}

// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body
//     const uuid = new UUID(new Date().getTime()).uuid()
//     const hashedUUID = await hashSecret(uuid)
//     const user = await User.findOneAndUpdate({ email }, { uuid: hashedUUID })
//     if (user && (await VerifyPassword(user, password, res))) {
//       await SendUUID(uuid, user.email)
//       res.json({ message: 'Sending Email' })
//     } else {
//       res.status(401).json({ error: 'Invalid Credentials' })
//     }
//   } catch (error) {
//     res.status(500).json({ error: error })
//   }
// }

export const registerUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body
    const password_digest = await HashPassword(password, res)

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
    const token = signToken(payload)
    if (token) {
      await user.save()
      res.json({ payload, token })
    }
  } catch (error) {
    res.status(500).json({ error: error.message.split(':')[0] })
  }
}
