"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ProjectController = require("./ProjectController");

Object.keys(_ProjectController).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ProjectController[key];
    }
  });
});

var _UserController = require("./UserController");

Object.keys(_UserController).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _UserController[key];
    }
  });
});
//# sourceMappingURL=index.js.map