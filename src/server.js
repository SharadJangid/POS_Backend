const app = require('./app');

/**
 * Server class to start on a given port.
 */
class Server {
  constructor(port) {
    this.port = port;
  }

  /**
   * Method to start listening on the configured port.
   */
  start() {
    app.listen(this.port, () => {
      console.log(`Server running at http://localhost:${this.port}`);
    });
  }
}

// Instantiate and start the server using port 3000 (or from env variable if needed).
const server = new Server(process.env.PORT || 3000);
server.start();
