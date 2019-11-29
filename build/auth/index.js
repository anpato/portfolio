"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("dotenv/config");

var _services = require("../services");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var jwt = _jsonwebtoken["default"];
var TOKEN_KEY = process.env.TOKEN_KEY;
var SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);

var AuthController =
/*#__PURE__*/
function () {
  function AuthController() {
    _classCallCheck(this, AuthController);
  }

  _createClass(AuthController, [{
    key: "Authenticate",
    value: function Authenticate(req, res, next) {
      var token, data;
      return regeneratorRuntime.async(function Authenticate$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              try {
                token = req.headers.authorization.split(' ')[1];
                data = jwt.verify(token, TOKEN_KEY);
                res.locals.user = data; // if (compare(req))

                next();
              } catch (error) {
                res.status(403).send({
                  error: 'Unauthorized'
                });
              }

            case 1:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "VerifyToken",
    value: function VerifyToken(req, res) {
      var token, user;
      return regeneratorRuntime.async(function VerifyToken$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              try {
                token = req.headers.authorization.split(' ')[1];
                user = jwt.verify(token, TOKEN_KEY);
                res.json(user);
              } catch (error) {
                res.status(403).send({
                  error: 'Unauthorized'
                });
              }

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }, {
    key: "SignToken",
    value: function SignToken(payload) {
      var token = jwt.sign({
        payload: payload,
        exp: Math.floor(new Date().getTime() / 1000) + 42 * 3600
      }, TOKEN_KEY);
      return token;
    }
  }, {
    key: "VerifyPassword",
    value: function VerifyPassword(user, password, res) {
      return regeneratorRuntime.async(function VerifyPassword$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return regeneratorRuntime.awrap(_bcrypt["default"].compare(password, user.password_digest));

            case 3:
              return _context3.abrupt("return", _context3.sent);

            case 6:
              _context3.prev = 6;
              _context3.t0 = _context3["catch"](0);
              res.status(500).json({
                error: _context3.t0.message
              });

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[0, 6]]);
    }
  }, {
    key: "HashPassword",
    value: function HashPassword(password, res) {
      return regeneratorRuntime.async(function HashPassword$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return regeneratorRuntime.awrap(_bcrypt["default"].hash(password, SALT_ROUNDS));

            case 3:
              return _context4.abrupt("return", _context4.sent);

            case 6:
              _context4.prev = 6;
              _context4.t0 = _context4["catch"](0);
              res.status(500).json({
                error: _context4.t0.message
              });

            case 9:
            case "end":
              return _context4.stop();
          }
        }
      }, null, null, [[0, 6]]);
    }
  }]);

  return AuthController;
}();

exports["default"] = AuthController;
//# sourceMappingURL=index.js.map