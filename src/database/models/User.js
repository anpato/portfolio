import { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
const UserModel = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    password_digest: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

UserModel.plugin(uniqueValidator)
export { UserModel }
