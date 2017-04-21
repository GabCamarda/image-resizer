"use strict";

const Server = require('./server');
const Logger = require('./logger');
const Db = require('./db');
const ImageResizer = require('./resizer');

/**
 * Setting enviroment config
 */
const config = process.env.NODE_ENV === 'development' ? require('./config/dev') : require('./config');

const logger = new Logger(config);
const imageResizer = new ImageResizer(config, logger);
const db = new Db(config, logger);
const server = new Server(config, logger, imageResizer, db);

module.exports.disconnect = () => {
    server.shutdown();
};

/**
 * Starts the app
 */
server.start();