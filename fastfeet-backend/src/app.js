require('dotenv/config');
require('express-async-errors');
const path = require('path');
const Youch = require('youch');
const express = require('express');
const cors = require('cors');
const routers = require('./router');

require('./database/index');

class App {
  constructor() {
    this.app = express();
    this.middleware();
    this.routers();
    this.errorHandler();
  }

  middleware() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use('/files', express.static(
      path.resolve(__dirname, '..', 'tmp', 'uploads'),
    ));
  }

  routers() {
    this.app.use(routers);
  }

  errorHandler() {
    // eslint-disable-next-line no-unused-vars
    this.app.use(async (err, req, res, next) => {
      const error = await new Youch(err, req).toJSON();

      return res.status(500).json({
        error,
      });
    });
  }
}

module.exports = new App().app;
