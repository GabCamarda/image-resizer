"use strict";

const express = require('express');
const http = require('http');
const fs = require('fs');
const urlParser = require('url');

class Server {

    constructor(config, logger, resizer, db) {
        this.config = config;
        this.logger = logger;
        this.imageResizer = resizer;
        this.db = db;
        this.setRoutes();
    }

    setRoutes() {
        this.app = express();
        this.app.get('/', (req, res) => {
            this.logger.info('client connected');
        });
        this.app.get('/resize', this.resizeRouteHandler.bind(this));
    }


    resizeRouteHandler(req, res) {
        let resizeWidth = req.query.width ? parseInt(req.query.width) : undefined;
        let resizeHeight = req.query.height ? parseInt(req.query.height) : undefined;
        let url = req.query.url ? urlParser.parse(req.query.url) : undefined;
        let fileName = urlParser.parse(url).pathname.split('/').pop();
        let filePath = this.config.server.downloadDir + '/' + fileName;
        let resizePath = this.config.server.resizeDir + '/' + fileName;
        if(!resizeWidth) {
            res.send('Width parameter must be a valid number');
            this.logger.error('Width parameter not valid');
            return;
        }
        if(!url) {
            res.send('Url parameter must be valid');
            this.logger.error('Url parameter not valid');
            return;
        }

        this.download(url, filePath)
            .then(image => {
                this.imageResizer.getInfo(image)
                    .then(metadata => {
                        //save metadata to redis
                    });
                this.imageResizer.resize(image, resizeWidth, resizeHeight, resizePath);

                this.logger.info('File saved successfully');
                res.send('File saved successfully');
            })
            .catch(error => {
                this.logger.error(error);
                res.send('An error occurred. Please try again later');
            });
    }

    download(url, filePath) {
        return new Promise((resolve, reject) => {
            let request = http.get(url, (res) => {
                let writeStream = fs.createWriteStream(filePath);
                writeStream.on('finish', () => {
                    writeStream.close();

                    return resolve(filePath);
                });

                res.pipe(writeStream);
                res.on('error', (error) => {
                    res.send('An error occurred. Please try again later');
                    this.logger.error(error);
                });
            });

            request.on('error', (error) => {
                return reject(error);
            });
        });
    }

    start() {
        this.app.listen(this.config.server.port, () => {
            console.log('Server started on port ' + this.config.server.port);
        });
    }

}

module.exports = Server;