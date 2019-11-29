"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TagModel = void 0;

var _mongoose = require("mongoose");

var TagModel = new _mongoose.Schema({
  name: String
}, {
  timestamps: true
});
exports.TagModel = TagModel;
//# sourceMappingURL=Tags.js.map