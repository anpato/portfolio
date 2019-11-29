"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendContact = void 0;

var _nodemailer = require("nodemailer");

require("dotenv/config");

var sendContact = function sendContact(req, res, next) {
  var transporter;
  return regeneratorRuntime.async(function sendContact$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          transporter = (0, _nodemailer.createTransport)({
            host: 'smtp.gmail.com',
            secure: true,
            auth: {
              user: process.env.MAILER,
              pass: process.env.MAILER_PASS
            }
          });
          _context.next = 4;
          return regeneratorRuntime.awrap(transporter.sendMail({
            from: process.env.MAILER,
            to: req.body.email,
            text: "Thanks for reaching out!"
          }));

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(transporter.sendMail({
            from: req.body.email,
            to: process.env.MAILER,
            subject: req.body.subject,
            text: 'Message from '
          }));

        case 6:
          res.json({
            message1: "Sent mail to ".concat(req.body.email),
            message2: "Send mail to ".concat(process.env.MAILER)
          });
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          throw _context.t0;

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.sendContact = sendContact;
//# sourceMappingURL=Mailer.js.map