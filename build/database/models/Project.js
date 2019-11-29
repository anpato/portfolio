"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProjectModel = void 0;

var _mongoose = require("mongoose");

var ProjectModel = new _mongoose.Schema({
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
    "static": Array
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
  },
  tags: {
    type: [{
      type: _mongoose.Schema.Types.ObjectId,
      ref: 'tags'
    }]
  }
}, {
  timestamps: true
});
exports.ProjectModel = ProjectModel;
//# sourceMappingURL=Project.js.map