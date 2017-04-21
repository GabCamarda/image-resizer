"use strict";

class Logger {

    constructor(config) {
        this.config = config;
    }

    /**
     * Outputs message in red
     * @param message
     */
    error(message) {
        console.log(this.config.logger.consoleColours.error, message, this.config.logger.consoleColours.reset);
    }

    /**
     * Outputs message in yellow
     * @param message
     */
    warning(message) {
        console.log(this.config.logger.consoleColours.warning, message, this.config.logger.consoleColours.reset);
    }

    /**
     * Outputs message in green
     * @param message
     */
    info(message) {
        console.log(this.config.logger.consoleColours.info, message, this.config.logger.consoleColours.reset);
    }
}

module.exports = Logger;