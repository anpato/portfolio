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
    images: {
      gif: {
        type: String
      },
      static: Array
    },
    github_link: {
      type: String
    },
    deploy_link: {
      type: String
    },
    released: {
      type: Boolean,
      required: true
    }
  },
  {
    timestamps: true
  }
)
