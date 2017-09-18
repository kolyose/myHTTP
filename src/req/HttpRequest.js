const Readable = require("stream").Readable;
const StateProcessingHeaders = require("./HttpRequestStateProcessingHeaders");

class HttpRequest extends Readable {
  constructor(socket) {
    super();
    this._state = new StateProcessingHeaders(this);
    this._socket = socket;
    this._socket.on("data", data => {
      this.onData(data);
    });
    this._headInfo = undefined;
  }

  _read() {
    this.socket.resume();
  }

  onData(data) {
    this._state.onData(data);
  }

  _applyState(newState) {
    if (this._state) {
      this._state.exit();
    }

    this._state = newState;
    this._state.entry();
  }

  dispatchEvent(event) {
    this.emit(event);
  }

  get headers() {
    return this._headInfo.headers;
  }

  get method() {
    return this._headInfo.method;
  }

  get url() {
    return this._headInfo.url;
  }

  get socket() {
    return this._socket;
  }
}

module.exports = HttpRequest;
