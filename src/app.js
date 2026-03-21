const express = require('express');
const cors = require('cors');
const idRoutes = require('./routes/idRoutes');

/**
 * App class to set up the Express application.
 */
class App {
  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  /**
   * Set up middlewares for the Express application.
   */
  middlewares() {
    this.express.use(express.json());
    this.express.use(cors());
  }

  /**
   * Register available API routes.
   */
  routes() {
    this.express.use('/api', idRoutes);

    // Initial API health check
    this.express.get('/', (req, res) => {
      res.json({ message: 'POS System APIs are running!' });
    });
  }
}

// Create an instance of the class that has we initialized app.js.
module.exports = new App().express;
