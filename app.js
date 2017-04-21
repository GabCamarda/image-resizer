"use strict";

const config = require('./config');
const Server = require('./server');
const Logger = require('./logger');
const Db = require('./db');
const ImageResizer = require('./resizer');

const logger = new Logger(config);
const imageResizer = new ImageResizer(config, logger);
const db = new Db(config, logger);
const server = new Server(config, logger, imageResizer, db);

server.start();