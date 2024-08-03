"use strict";

var _express = _interopRequireDefault(require("express"));
var _viewEngine = _interopRequireDefault(require("./configs/viewEngine"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _api = _interopRequireDefault(require("./routes/api"));
var _cors = _interopRequireDefault(require("./configs/cors"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
require('dotenv').config();
var app = (0, _express["default"])(),
  PORT = process.env.PORT || 8080;

//cors:
(0, _cors["default"])(app);
//config view engine:
(0, _viewEngine["default"])(app);

//config body-parser: 
app.use(_bodyParser["default"].json({
  limit: '50mb'
})); //mặc định limit-size = 1MB
app.use(_bodyParser["default"].urlencoded({
  limit: '50mb',
  extended: true
}));
(0, _api["default"])(app);
app.listen(PORT, function () {
  console.log("SERVER is running on PORT:", PORT);
});