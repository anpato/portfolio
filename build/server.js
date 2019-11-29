"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

var _mongoose = require("mongoose");

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _helmet = _interopRequireDefault(require("helmet"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _config2 = require("./config");

var _routes = _interopRequireDefault(require("./routes"));

var _services = require("./services");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var App = (0, _express["default"])();
var sameSite = process.argv[2] || true;
var PORT = process.env.PORT || process.env.LOCAL_PORT;
App.use((0, _helmet["default"])());
App.disable('x-powered-by');
App.use((0, _morgan["default"])('dev'));
App.use((0, _cookieParser["default"])());
App.use((0, _cors["default"])());
App.use(_bodyParser["default"].urlencoded({
  extended: true
}));
App.use(_bodyParser["default"].json()); // App.locals.sessionID = genID()
// Mongodb Connection

(0, _mongoose.connect)((0, _config2.db)().connect, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
});

_mongoose.connection.once('open', function () {
  console.log("connected to ".concat((0, _config2.db)().name));
}); // Mongodb Connection


App.get('/', function (req, res) {
  return res.status(200).cookie('sessionID', App.locals.sessionID, {
    sameSite: sameSite
  }).json({
    msg: 'Portfolio'
  });
});
App.use('/api', _routes["default"]);
App.listen(PORT);
var _default = App;
exports["default"] = _default;
//# sourceMappingURL=server.js.map