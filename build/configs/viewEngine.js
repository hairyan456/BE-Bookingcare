"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var configViewEngine = function configViewEngine(app) {
  app.use(_express["default"]["static"]('./src/public')); //cho phép ng dùng truy cập các source lưu trong folder 'public'
  app.set("view engine", "ejs"); //nói express biết sẽ code HTML thông qua EJS (view engine)
  app.set("views", "./src/views"); //lưu trữ tất cả file .ejs trong thư mục "views", Express tự động tìm tới thư mục này
};
var _default = exports["default"] = configViewEngine;