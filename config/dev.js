"use strict";

const devConfig = {

    server: {
        port: process.env.PORT || 1337,
        downloadDir: __dirname + '/../test/testImages/original',
        resizeDir: __dirname + '/../test/testImages/resized'
    },

    redis: {
        host: '127.0.0.1',
        port: 6379,
        dbIndex: 5
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

module.exports = devConfig;
