"use strict";

class Logger {

    constructor(config) {
        this.config = config;
    }

    error(message) {
        console.log(this.config.logger.consoleColours.error, message, this.config.logger.consoleColours.reset);
    }

    warning(message) {
        console.log(this.config.logger.consoleColours.warning, message, this.config.logger.consoleColours.reset);
    }

    info(message) {
        console.log(this.config.logger.consoleColours.info, message, this.config.logger.consoleColours.reset);
    }
}

module.exports = Logger;