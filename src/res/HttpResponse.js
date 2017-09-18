const Writable = require("stream").Writable;

class HttpResponse extends Writable {
  constructor(socket) {
    super();
    this._socket = socket;
    this._headers = {};
  }

  _write(data) {
    if (this._headers) {
      this.writeHead();
    }
    this._socket.write(data);
  }

  setHeader(headerName, value) {
    if (!this._headers) {
      throw new Error("Response head have already been sent to client!");
    }
    this._headers[headerName] = value;
  }

  writeHead(protocol = "HTTP/1.1", status = 200) {
    if (!this._headers) {
      throw new Error("Response head have already been sent to client!");
    }

    let headString = `${protocol} ${status}\r\n`;
    const headerEntries = Object.entries(this._headers);
    headerEntries.forEach(headerEntry => {
      headString = headString.concat(
        `${headerEntry[0]}: ${headerEntry[1]}\r\n`
      );
    });
    this._headers = null;
    this._socket.write(headString);
  }
}

module.exports = HttpResponse;
