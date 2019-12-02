import { Schema } from 'mongoose'

export const TagModel = new Schema(
  {
    name: String
  },
  {
    timestamps: true
  }
)
