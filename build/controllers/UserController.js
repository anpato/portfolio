"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserController = void 0;

var _database = require("../database");

var _auth = _interopRequireDefault(require("../auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var UserController = function UserController() {
  var _this = this;

  _classCallCheck(this, UserController);

  _defineProperty(this, "loginUser", function _callee(req, res) {
    var user, payload, token;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(_database.User.findOne({
              username: req.body.username
            }));

          case 3:
            user = _context.sent;
            _context.next = 6;
            return regeneratorRuntime.awrap(_this.Authenticate.VerifyPassword(user, req.body.password));

          case 6:
            if (!_context.sent) {
              _context.next = 12;
              break;
            }

            payload = {
              _id: user._id,
              name: user.name,
              email: user.email
            };
            token = _this.Authenticate.SignToken(payload);
            res.status(200).send({
              payload: payload,
              token: token
            });
            _context.next = 13;
            break;

          case 12:
            res.status(401).json({
              error: 'Token Invalid'
            });

          case 13:
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](0);
            res.status(401).json({
              error: 'Token Invalid'
            });

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 15]]);
  });

  _defineProperty(this, "registerUser", function _callee2(req, res) {
    var _req$body, name, email, username, password, password_digest, user, payload, token;

    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body = req.body, name = _req$body.name, email = _req$body.email, username = _req$body.username, password = _req$body.password;
            _context2.next = 4;
            return regeneratorRuntime.awrap(_this.Authenticate.HashPassword(password, res));

          case 4:
            password_digest = _context2.sent;
            user = new _database.User({
              name: name,
              username: username,
              email: email,
              password_digest: password_digest
            });
            payload = {
              _id: user._id,
              name: user.name,
              username: user.username
            };
            token = _this.Authenticate.SignToken(payload);

            if (!token) {
              _context2.next = 12;
              break;
            }

            _context2.next = 11;
            return regeneratorRuntime.awrap(user.save());

          case 11:
            res.json({
              payload: payload,
              token: token
            });

          case 12:
            _context2.next = 17;
            break;

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](0);
            res.status(500).json({
              error: _context2.t0.message.split(':')[0]
            });

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 14]]);
  });

  this.Authenticate = new _auth["default"]();
};

exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map