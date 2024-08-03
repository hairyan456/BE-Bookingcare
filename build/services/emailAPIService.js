"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _nodemailer = _interopRequireDefault(require("nodemailer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
require('dotenv').config();
var getBodyHTMLEmail = function getBodyHTMLEmail(dataSend) {
  var result = '';
  if (dataSend.language === 'vi') {
    result = "\n<h3>Xin cha\u0300o ".concat(dataSend.patientName, "!</h3>\n<p>Ba\u0323n nh\xE2\u0323n \u0111\u01B0\u01A1\u0323c email na\u0300y vi\u0300 \u0111a\u0303 \u0111\u0103\u0323t li\u0323ch kha\u0301m b\xEA\u0323nh online tr\xEAn: <a target=\"_blank \" href=\"http://localhost:3000/\">Bookingcare.vn</a></p>\n<p>Th\xF4ng tin \u0111\u0103\u0323t li\u0323ch kha\u0301m b\xEA\u0323nh:</p>\n<div><b>Th\u01A1\u0300i gian: ").concat(dataSend.time, "</b></div>\n<div><b>Ba\u0301c si\u0303: ").concat(dataSend.doctorName, "</b></div>\n<div><b>Ta\u0323i: ").concat(dataSend.addressClinic, "</b></div>\n<p>N\xEA\u0301u ca\u0301c th\xF4ng tin tr\xEAn la\u0300 \u0111u\u0301ng, vui lo\u0300ng click va\u0300o \u0111\u01B0\u01A1\u0300ng link d\u01B0\u01A1\u0301i \u0111\xE2y \u0111\xEA\u0309 xa\u0301c nh\xE2\u0323n va\u0300 hoa\u0300n t\xE2\u0301t thu\u0309 tu\u0323c \u0111\u0103\u0323t li\u0323ch kha\u0301m \nb\xEA\u0323nh</p>\n<div><a href=").concat(dataSend.redirectLink, " target='_blank'>Click here</a></div>\n<div>Xin ch\xE2n tha\u0300nh ca\u0309m \u01A1n.</div>\n");
  } else if (dataSend.language === 'en') {
    result = "\n        <h3>Dear ".concat(dataSend.patientName, "!</h3>\n        <p>You received this email because you made an online medical appointment on: <a target=\"_blank \" href=\"http://localhost:3000/\">Bookingcare.vn</a></p>\n        <p>Information on scheduling medical examinations:</p>\n        <div><b>Time: ").concat(dataSend.time, "</b></div>\n        <div><b>Doctor: ").concat(dataSend.doctorName, "</b></div>\n        <div><b>At: ").concat(dataSend.addressClinic, "</b></div>\n        <p>If the above information is correct, please click on the link below to confirm and complete the appointment procedure\n        sick</p>\n        <div><a href=").concat(dataSend.redirectLink, " target='_blank'>Click here</a></div>\n        <div>Sincerely thank.</div>\n        ");
  }
  return result;
};
var sendSimpleEmail = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(dataSend) {
    var transporter, info;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          //create reusable transporter object using the default SMTP transport
          transporter = _nodemailer["default"].createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            // Use `true` for port 465, `false` for all other ports
            auth: {
              user: process.env.EMAIL_APP,
              pass: process.env.EMAIL_APP_PASSWORD
            }
          }); // send mail with defined transport object
          _context.next = 3;
          return transporter.sendMail({
            from: '"Hoàng Hải Vũ 👻" <hairyan789@gmail.com>',
            // sender address
            to: dataSend.receiverEmail,
            // list of receivers
            subject: dataSend.language === 'vi' ? "Thông báo xác nhận đặt lịch khám bệnh - BookingCare" : 'Notice of confirmation of medical examination appointment - BookingCare',
            // Subject line
            html: getBodyHTMLEmail(dataSend) // html body
          });
        case 3:
          info = _context.sent;
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function sendSimpleEmail(_x) {
    return _ref.apply(this, arguments);
  };
}();
var getBodyHTMLEmailRemedy = function getBodyHTMLEmailRemedy(dataSend) {
  var result = '';
  if (dataSend.language === 'vi') {
    result = "\n<h3>Xin cha\u0300o ".concat(dataSend.patientName, "!</h3>\n<p>Ba\u0323n nh\xE2\u0323n \u0111\u01B0\u01A1\u0323c email na\u0300y vi\u0300 \u0111a\u0303 hoa\u0300n t\xE2\u0301t kha\u0301m b\xEA\u0323nh tr\xEAn: <a target=\"_blank \" href=\"http://localhost:3000/\">Bookingcare.vn</a></p>\n<p>Th\xF4ng tin \u0111\u01A1n thu\xF4\u0301c/ho\u0301a \u0111\u01A1n \u0111\u01B0\u01A1\u0323c g\u01B0\u0309i trong file \u0111i\u0301nh ke\u0300m d\u01B0\u01A1\u0301i \u0111\xE2y.</p>\n<div>Xin ch\xE2n tha\u0300nh ca\u0309m \u01A1n.</div>\n");
  } else if (dataSend.language === 'en') {
    result = "\n        <h3>Dear ".concat(dataSend.patientName, "!</h3>\n        <p>You received this email because you made an online medical appointment on: <a target=\"_blank \" href=\"http://localhost:3000/\">Bookingcare.vn</a></p>\n        <p>Information about remedy examinations is attached bellow.</p>\n        <div>Sincerely thank.</div>\n        ");
  }
  return result;
};
var sendAttachment = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(dataSend) {
    var transporter, info;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          //create reusable transporter object using the default SMTP transport
          transporter = _nodemailer["default"].createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            // Use `true` for port 465, `false` for all other ports
            auth: {
              user: process.env.EMAIL_APP,
              pass: process.env.EMAIL_APP_PASSWORD
            }
          }); // send mail with defined transport object
          _context2.next = 3;
          return transporter.sendMail({
            from: '"Hoàng Hải Vũ 👻" <hairyan789@gmail.com>',
            // sender address
            to: dataSend.email,
            // list of receivers
            subject: dataSend.language === 'vi' ? "Kết quả khám bệnh - BookingCare" : 'Notice of examination results - BookingCare',
            // Subject line
            html: getBodyHTMLEmailRemedy(dataSend),
            // html body
            attachments: [{
              filename: "remedy-".concat(dataSend.patientId, "-").concat(new Date().getTime(), ".png"),
              content: dataSend.imgBase64.split("base64,")[1],
              encoding: 'base64'
            }]
          });
        case 3:
          info = _context2.sent;
        case 4:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function sendAttachment(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
module.exports = {
  sendSimpleEmail: sendSimpleEmail,
  sendAttachment: sendAttachment
};