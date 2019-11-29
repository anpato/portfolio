"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Schema = require("./Schema");

Object.keys(_Schema).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Schema[key];
    }
  });
});
//# sourceMappingURL=index.js.map