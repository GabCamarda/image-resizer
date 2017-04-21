"use strict";

const config = {

    server: {
        port: process.env.PORT || 1337,
        downloadDir: __dirname + '/../images/original_images',
        resizeDir: __dirname + '/../images/resized_images'
    },

    redis: {
        host: '127.0.0.1',
        port: 6379
    },

    logger: {
        consoleColours: {
            error: '\x1b[41m',
            warning: '\x1b[43m',
            info: '\x1b[42m',
            reset: '\x1b[0m'
        }
    }

};

module.exports = config;