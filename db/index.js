"use strict";

const redis = require('redis');

class Db {

    constructor(config, logger) {
        this.config = config;
        this.logger = logger;
        this.init();
    }

    /**
     * Initialise client
     */
    init() {
        this.redisClient = new redis.createClient();
        this.redisClient.on('connect', () => {
            this.isReady = true;
        });
    }

    /**
     * Redis hmset
     * @param key
     * @param args
     */
    save(key, args) {
        this.redisClient.hmset(key, args);
    }

    /**
     * Redis hgetall
     * @param key
     * @returns {Promise}
     */
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

    /**
     * returns connected flag
     * @returns {boolean}
     */
    isConnected() {
        return this.isReady;
    }
}

module.exports = Db;