"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tag = exports.Project = exports.User = void 0;

var _mongoose = require("mongoose");

var _models = require("./models");

var User = (0, _mongoose.model)('users', _models.UserModel);
exports.User = User;
var Project = (0, _mongoose.model)('projects', _models.ProjectModel);
exports.Project = Project;
var Tag = (0, _mongoose.model)('tags', _models.TagModel);
exports.Tag = Tag;
//# sourceMappingURL=Schema.js.map