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
    image_gif: String,
    image_static: Array,
    github_link: {
      type: String
    },
    deploy_link: {
      type: String
    },
    released: {
      type: Boolean,
      required: true
    },
    tags: {
      type: [{ type: Schema.Types.ObjectId, ref: 'tags' }]
    }
  },
  {
    timestamps: true
  }
)
