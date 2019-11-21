import { Schema } from 'mongoose'

export const ProjectModel = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image_url: {
      type: String
    },
    deploy_link: {
      type: String
    },
    development: {
      type: Boolean,
      required: true
    }
  },
  {
    timestamps: true
  }
)
