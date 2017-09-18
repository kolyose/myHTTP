const StateProcessingBody = require("./HttpRequestStateProcessingBody");

class HttpRequestStateProcessingHeaders {
  constructor(httpRequest) {
    this.httpRequest = httpRequest;
    this._tempBuffer = undefined;
  }

  entry() {}

  exit() {
    this.httpRequest.dispatchEvent("headersReady");
    this.httpRequest.socket.pause();
  }

  onData(data) {
    if (this._tempBuffer) {
      this._tempBuffer = Buffer.concat([this._tempBuffer, data]);
    } else {
      this._tempBuffer = data;
    }

    const completeRequest = this._getCompleteRequest(this._tempBuffer);
    if (completeRequest) {
      const requestData = this._parseRequestInfo(completeRequest.head);
      this.httpRequest.socket.unshift(completeRequest.body);
      this.httpRequest._headInfo = requestData;
      this.httpRequest.applyState(new StateProcessingBody(this.httpRequest));
    }
  }

  _getCompleteRequest(buffer) {
    const tempString = buffer.toString("utf-8");
    if (~tempString.indexOf("\r\n\r\n")) {
      const requestParts = tempString.split("\r\n\r\n");
      return {
        head: requestParts[0],
        body: requestParts[1]
      };
    }

    return null;
  }

  _parseRequestInfo(buffer) {
    const result = {};
    result.headers = {};

    const requestHead = buffer.toString("utf-8");
    const requestRecords = requestHead.split("\r\n");
    const requestParams = requestRecords.shift().split(" ");

    result.method = requestParams[0];
    result.path = requestParams[1];
    result.protocol = requestParams[2];

    // eslint-disable-next-line
    for (let requestRecord of requestRecords) {
      const recordParts = requestRecord.split(": ");
      result.headers[recordParts[0]] = recordParts[1];
    }

    return result;
  }
}

module.exports = HttpRequestStateProcessingHeaders;
