"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = void 0;

require("dotenv/config");

var db = function db() {
  if (process.env.NODE_ENV === 'production') {
    return {
      name: 'Portfolio Production',
      connect: process.env.DATABASE_URI
    };
  } else {
    return {
      name: 'Portfolio Development',
      connect: process.env.DEVELOP_URI
    };
  }
};

exports.db = db;
//# sourceMappingURL=index.js.map