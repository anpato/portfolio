"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _services = require("../services");

var _controllers = require("../controllers/");

var _auth = _interopRequireDefault(require("../auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Controllers
// Controllers
var Router = (0, _express.Router)();
/* ============================================= */
// Multer Config

var storage = _multer["default"].memoryStorage({
  destination: function destination(req, file, cb) {
    cb(null, '');
  }
}); // Multer Config

/* ============================================= */

/* ============================================= */
// Initialize controllers


var authController = new _auth["default"]();
var userController = new _controllers.UserController();
var awsController = new _services.AwsController();
var projectController = new _controllers.ProjectController(); // Initialize controllers

/* ============================================= */

/* ============================================= */
// Authentication Routes

Router.post('/auth/sign-up', userController.registerUser);
Router.post('/auth/login', userController.loginUser);
Router.post('/auth/register', userController.registerUser);
Router.get('/auth/verify', authController.VerifyToken); // Authentication Routes

/* ============================================= */

/* ============================================= */
// Project Routes

Router.get('/projects', projectController.getProjects);
Router.get('/projects/:project_id', projectController.getProject);
Router.get('/projects/filter/released', projectController.filterProjects);
Router.put('/projects/:project_id', authController.Authenticate, (0, _multer["default"])({
  storage: storage
}).array('projects'), awsController.upload, projectController.updateProject);
Router.post('/projects', authController.Authenticate, (0, _multer["default"])({
  storage: storage
}).array('projects'), awsController.upload, projectController.uploadProject);
Router["delete"]('/projects/:project_id', authController.Authenticate, projectController.deleteProject, awsController.deleteFile); // Project Routes

/* ============================================= */

/* ============================================= */
// Tags

Router.get('/tags', projectController.getTags); // Tags

/* ============================================== */

/* ============================================== */
// Contact Routes

Router.post('/contact', _services.sendContact); // Contact Routes

/* ============================================== */

var _default = Router;
exports["default"] = _default;
//# sourceMappingURL=index.js.map