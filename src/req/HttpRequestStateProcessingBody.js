class HttpRequestStateProcessingBody {
  constructor(httpRequest) {
    this.httpRequest = httpRequest;
  }

  entry() {}

  exit() {}

  onData(data) {
    this.httpRequest.push(data);
    this.httpRequest.socket.pause();
  }
}

module.exports = HttpRequestStateProcessingBody;
