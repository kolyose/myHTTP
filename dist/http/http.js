"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventEmitter = require("events").EventEmitter;
var net = require("net");
var HttpRequest = require("./req/HttpRequest");
var HttpResponse = require("./res/HttpResponse");

var HttpServer = function (_EventEmitter) {
  _inherits(HttpServer, _EventEmitter);

  function HttpServer() {
    _classCallCheck(this, HttpServer);

    var _this = _possibleConstructorReturn(this, (HttpServer.__proto__ || Object.getPrototypeOf(HttpServer)).call(this));

    _this.server = net.createServer(function (socket) {
      _this.req = new HttpRequest(socket);
      _this.res = new HttpResponse(socket);
    });
    return _this;
  }

  return HttpServer;
}(EventEmitter);

module.exports = HttpServer;
//# sourceMappingURL=http.js.map