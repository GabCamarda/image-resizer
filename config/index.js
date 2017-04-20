"use strict";

const config = {

    server: {
        port: 8000,
        downloadDir: __dirname + '/../images/original_images',
        resizeDir: __dirname + '/../images/resized_images'
    },

    logger: {
        consoleColours: {
            error: '\x1b[41m',
            warning: '\x1b[44m',
            info: '\x1b[42m',
            reset: '\x1b[0m'
        }
    }

};

module.exports = config;