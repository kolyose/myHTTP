const EventEmitter = require("events").EventEmitter;
const net = require("net");
const HttpRequest = require("./req/HttpRequest");
const HttpResponse = require("./res/HttpResponse");

class HttpServer extends EventEmitter {
  constructor() {
    super();
    this.server = net.createServer(socket => {
      this.req = new HttpRequest(socket);
      this.res = new HttpResponse(socket);

      this.req.on("headersReady", () => {
        this.emit("request", this.req, this.res);
      });
    });
  }

  listen(port) {
    const PORT = port || 3000;
    this.server.listen(PORT, "localhost", () => {
      console.log(`server listening on port ${PORT}`);
    });
  }
}

module.exports = HttpServer;
