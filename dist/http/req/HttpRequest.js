"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Readable = require("stream").Readable;
var StateProcessingHeaders = require("./HttpRequestStateProcessingHeaders");
var StateProcessingBody = require("./HttpRequestStateProcessingBody");

var HttpRequest = function (_Readable) {
  _inherits(HttpRequest, _Readable);

  function HttpRequest(socket) {
    _classCallCheck(this, HttpRequest);

    var _this = _possibleConstructorReturn(this, (HttpRequest.__proto__ || Object.getPrototypeOf(HttpRequest)).call(this));

    _this._state = new StateProcessingHeaders(_this);
    _this._socket = socket;
    _this._socket.on("data", function (data) {
      _this.onData(data);
    });
    _this._headInfo;
    return _this;
  }

  _createClass(HttpRequest, [{
    key: "_read",
    value: function _read() {}
  }, {
    key: "onData",
    value: function onData(data) {
      this._state.onData(data);
    }
  }, {
    key: "_applyState",
    value: function _applyState(newState) {
      if (this._state) {
        this._state.exit();
      }

      this._state = newState;
      this._state.entry();
    }
  }, {
    key: "processHeaders",
    value: function processHeaders() {}
  }, {
    key: "socket",
    get: function get() {
      return this._socket;
    }
  }]);

  return HttpRequest;
}(Readable);

module.exports = HttpRequest;
//# sourceMappingURL=HttpRequest.js.map