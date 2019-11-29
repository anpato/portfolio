"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HelperService =
/*#__PURE__*/
function () {
  function HelperService() {
    _classCallCheck(this, HelperService);
  }

  _createClass(HelperService, [{
    key: "checkGif",
    value: function checkGif(files) {
      var obj = {
        gif: '',
        "static": []
      };
      files.forEach(function (file) {
        if (file.includes('.gif')) {
          Object.assign(obj, {
            gif: file
          });
        } else {
          obj["static"].push(file);
        }
      });
      return obj;
    }
  }, {
    key: "checkTags",
    value: function checkTags(tags, Model) {
      var cleanedTags, returnedTags, i, findTag, newTag;
      return regeneratorRuntime.async(function checkTags$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              cleanedTags = JSON.parse(tags);
              returnedTags = [];
              i = 0;

            case 3:
              if (!(i < cleanedTags.length)) {
                _context.next = 18;
                break;
              }

              _context.next = 6;
              return regeneratorRuntime.awrap(Model.findOne({
                name: cleanedTags[i]
              }));

            case 6:
              findTag = _context.sent;

              if (findTag) {
                _context.next = 14;
                break;
              }

              newTag = new Model({
                name: cleanedTags[i]
              });
              _context.next = 11;
              return regeneratorRuntime.awrap(newTag.save());

            case 11:
              returnedTags.push(newTag._id.toString());
              _context.next = 15;
              break;

            case 14:
              returnedTags.push(findTag._id.toString());

            case 15:
              i++;
              _context.next = 3;
              break;

            case 18:
              return _context.abrupt("return", returnedTags);

            case 19:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }]);

  return HelperService;
}();

exports["default"] = HelperService;
//# sourceMappingURL=index.js.map