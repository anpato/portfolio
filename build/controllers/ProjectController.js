"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProjectController = void 0;

var _database = require("../database");

var _helpers = _interopRequireDefault(require("./helpers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ProjectController = function ProjectController() {
  var _this = this;

  _classCallCheck(this, ProjectController);

  _defineProperty(this, "getProjects", function _callee(req, res) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(_database.Project.find().populate('tags').exec(function (err, data) {
              if (err) res.status(500).json({
                error: err
              });else {
                res.send(data);
              }
            }));

          case 3:
            _context.next = 8;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context["catch"](0);
            res.status(500).json({
              error: _context.t0.message
            });

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 5]]);
  });

  _defineProperty(this, "filterProjects", function _callee2(req, res) {
    var project;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return regeneratorRuntime.awrap(_database.Project.find({
              released: req.query.released
            }));

          case 3:
            project = _context2.sent;
            res.send(project);
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            res.status(500).json({
              error: _context2.t0.message
            });

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 7]]);
  });

  _defineProperty(this, "getProject", function _callee3(req, res) {
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return regeneratorRuntime.awrap(_database.Project.findById(req.params.project_id).populate('tags').exec(function (err, project) {
              if (err) res.status(500).json({
                error: error.message
              });else {
                res.send(project);
              }
            }));

          case 3:
            _context3.next = 8;
            break;

          case 5:
            _context3.prev = 5;
            _context3.t0 = _context3["catch"](0);
            res.status(500).json({
              error: _context3.t0.message
            });

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 5]]);
  });

  _defineProperty(this, "uploadProject", function _callee4(req, res) {
    var images, tags, project;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            images = _this.Helpers.checkGif(res.locals.files);
            _context4.next = 4;
            return regeneratorRuntime.awrap(_this.Helpers.checkTags(req.body.tags, _database.Tag));

          case 4:
            tags = _context4.sent;
            project = new _database.Project(_objectSpread({}, req.body.project, {
              images: images,
              tags: tags
            }));
            _context4.next = 8;
            return regeneratorRuntime.awrap(project.save());

          case 8:
            res.send(project);
            _context4.next = 14;
            break;

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](0);
            res.status(500).json({
              error: _context4.t0.message
            });

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 11]]);
  });

  _defineProperty(this, "updateProject", function _callee5(req, res) {
    var images, projectBody, project;
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            images = req.files.length ? _this.Helpers.checkGif(res.locals.files) : null;
            projectBody = JSON.parse(req.body.project);
            console.log(projectBody);
            _context5.next = 6;
            return regeneratorRuntime.awrap(_database.Project.findById(req.params.project_id));

          case 6:
            project = _context5.sent;
            _context5.t0 = regeneratorRuntime;
            _context5.t1 = _database.Project;
            _context5.t2 = {
              _id: req.params.project_id
            };
            _context5.t3 = _objectSpread;
            _context5.t4 = {};
            _context5.t5 = projectBody;
            _context5.next = 15;
            return regeneratorRuntime.awrap(_this.Helpers.checkTags(req.body.tags, _database.Tag));

          case 15:
            _context5.t6 = _context5.sent;
            _context5.t7 = req.files.length ? images : project.images;
            _context5.t8 = {
              tags: _context5.t6,
              images: _context5.t7
            };
            _context5.t9 = (0, _context5.t3)(_context5.t4, _context5.t5, _context5.t8);
            _context5.t10 = _context5.t1.updateOne.call(_context5.t1, _context5.t2, _context5.t9);
            _context5.next = 22;
            return _context5.t0.awrap.call(_context5.t0, _context5.t10);

          case 22:
            res.send(project);
            _context5.next = 29;
            break;

          case 25:
            _context5.prev = 25;
            _context5.t11 = _context5["catch"](0);
            res.status(500).json({
              error: _context5.t11
            });
            throw _context5.t11;

          case 29:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[0, 25]]);
  });

  _defineProperty(this, "deleteProject", function _callee6(req, res, next) {
    var project, image;
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return regeneratorRuntime.awrap(_database.Project.findById(req.params.project_id));

          case 3:
            project = _context6.sent;
            image = project.image_url.split('/');
            res.locals.filename = image[image.length - 1];
            res.locals.projectname = project.title;
            _context6.next = 9;
            return regeneratorRuntime.awrap(project.remove());

          case 9:
            next();
            _context6.next = 15;
            break;

          case 12:
            _context6.prev = 12;
            _context6.t0 = _context6["catch"](0);
            res.status(500).json({
              error: _context6.t0.message
            });

          case 15:
          case "end":
            return _context6.stop();
        }
      }
    }, null, null, [[0, 12]]);
  });

  _defineProperty(this, "getTags", function _callee7(req, res) {
    var tags;
    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return regeneratorRuntime.awrap(_database.Tag.find());

          case 3:
            tags = _context7.sent;
            res.send(tags);
            _context7.next = 10;
            break;

          case 7:
            _context7.prev = 7;
            _context7.t0 = _context7["catch"](0);
            res.status(500).json({
              error: _context7.t0.message
            });

          case 10:
          case "end":
            return _context7.stop();
        }
      }
    }, null, null, [[0, 7]]);
  });

  this.Helpers = new _helpers["default"]();
};

exports.ProjectController = ProjectController;
//# sourceMappingURL=ProjectController.js.map