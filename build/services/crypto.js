"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genID = exports.compare = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

require("dotenv/config");

var _server = _interopRequireDefault(require("../server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var compare = function compare(req) {
  return _crypto["default"].timingSafeEqual(Buffer.from(req.cookies.sessionID), Buffer.from(_server["default"].locals.sessionID));
};

exports.compare = compare;

var genID = function genID() {
  return _crypto["default"].randomBytes(parseInt(process.env.RANDOMBYTES)).toString('base64');
};

exports.genID = genID;
//# sourceMappingURL=crypto.js.map