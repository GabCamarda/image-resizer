"use strict";

const redis = require('redis');

class Db {

    constructor(config, logger) {
        this.config = config;
        this.logger = logger;
        this.init();
    }

    init() {
        this.redisClient = new redis.createClient();
        this.redisClient.on('connect', () => {
            this.isReady = true;
        });
    }

    save(key, args) {
        this.redisClient.hmset(key, args);
    }

    get(key) {
        return new Promise((resolve, reject) => {
            this.redisClient.hgetall(key, (error, replies) => {
                if(error) {
                    return reject(error);
                }
                resolve(replies);
            });
        });
    }

    isConnected() {
        return this.isReady;
    }
}

module.exports = Db;