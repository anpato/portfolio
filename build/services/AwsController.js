"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AwsController = void 0;

require("dotenv/config");

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AwsHelpers =
/*#__PURE__*/
function () {
  function AwsHelpers() {
    _classCallCheck(this, AwsHelpers);

    this.generateSubFolder = this.generateSubFolder.bind(this);
    this.dataParser = this.dataParser.bind(this);
    this.getKeys = this.getKeys.bind(this);
    this.setParams = this.setParams.bind(this);
  }

  _createClass(AwsHelpers, [{
    key: "generateSubFolder",
    value: function generateSubFolder(title) {
      return title.split(' ').join('-').toLowerCase();
    }
  }, {
    key: "dataParser",
    value: function dataParser(data) {
      return JSON.parse(data);
    }
  }, {
    key: "getKeys",
    value: function getKeys(data) {
      var existingFiles = [];

      for (var i = 0; i < data.length; i++) {
        if (data[i].Key.includes('project')) {
          existingFiles.push(data[i].Key);
        }
      }

      return existingFiles;
    }
  }, {
    key: "setParams",
    value: function setParams(data) {
      var params = {
        ACL: 'public-read',
        Bucket: process.env.AWS_BUCKET,
        Body: data.file.buffer,
        Key: "project/".concat(this.generateSubFolder(data.file))
      };
      return params;
    }
  }]);

  return AwsHelpers;
}();

var AwsController = function AwsController() {
  var _this = this;

  _classCallCheck(this, AwsController);

  _defineProperty(this, "upload", function (req, res, next) {
    var project = _this.Helpers.dataParser(req.body.project);

    var subFolder = _this.Helpers.generateSubFolder(project.title);

    if (req.files.length) {
      req.files.map(function (file) {
        _this.file = file;
        var existingFiles = [];

        _this.s3.listObjects({
          Bucket: process.env.AWS_BUCKET,
          Prefix: "project/".concat(subFolder)
        }, function (err, data) {
          if (err) throw err;else {
            var returnedKeys = _this.Helpers.getKeys(data.Contents);

            existingFiles = [].concat(_toConsumableArray(existingFiles), _toConsumableArray(returnedKeys));

            if (existingFiles.files.includes(_this.params)) {
              existingFiles.forEach(function (file) {
                return _this.deleteFile(null, res, file);
              });
            } else {
              _this.s3.upload(_this.Helpers.setParams({
                file: _this.file
              }), function (err, data) {
                if (err) throw err;else if (data) {
                  _this.files.push(data.Location);

                  if (_this.files.length === req.files.length) {
                    res.locals.files = _this.files;
                    next();
                  }
                }
              });
            }
          }
        });
      });
    } else {
      console.log('made it');
      next();
    }
  });

  _defineProperty(this, "deleteFile", function (req, res, file) {
    _this.params = _this.Helpers.setParams({
      file: file
    });

    _this.s3.deleteObject(_this.params, function (err, data) {
      if (err) console.log(err);else {
        console.log(data);
      }
    });
  });

  this.files = [];
  this.file = null;
  this.s3 = new _awsSdk["default"].S3();
  this.Helpers = new AwsHelpers();
  this.date = new Date().getTime();
  this.pushKeys = this.Helpers.getKeys;
  this.deleteFile = this.deleteFile.bind(this);
  this.params = null;
  this.s3.config.update({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
    region: 'us-east-1'
  });
};

exports.AwsController = AwsController;
//# sourceMappingURL=AwsController.js.map