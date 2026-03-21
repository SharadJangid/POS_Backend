const app = require('./app');

/**
 * Server class to start on a given port.
 */
class Server {
  constructor(port) {
    this.port = port || 9000; // Use port 10000 as default for many cloud platforms if not provided.
  }

  /**
   * Method to start listening on the configured port.
   * Bind to '0.0.0.0' to allow external traffic on cloud hosts like Render.
   */
  start() {
    app.listen(this.port, '0.0.0.0', () => {
      console.log(`🚀 POS Backend Server is running!`);
      console.log(`📡 Listening on Port: ${this.port}`);
    });
  }
}

// Instantiate and start the server using port from env variable.
const server = new Server(process.env.PORT);
server.start();
