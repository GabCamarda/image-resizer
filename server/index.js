"use strict";

const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const urlParser = require('url');
const crypto = require('crypto');

class Server {

    constructor(config, logger, resizer, db) {
        this.config = config;
        this.logger = logger;
        this.imageResizer = resizer;
        this.db = db;
        this.setRoutes();
    }

    /**
     * Defines routes
     */
    setRoutes() {
        this.app = express();
        this.app.get('/', (req, res) => {
            this.logger.info('client connected');
        });
        this.app.get('/resize', this.resizeRouteHandler.bind(this));
    }

    /**
     * Route handler for /resize path
     * @param req
     * @param res
     */
    resizeRouteHandler(req, res) {
        let resizeWidth = req.query.width ? parseInt(req.query.width) : undefined;
        let resizeHeight = req.query.height ? parseInt(req.query.height) : undefined;
        let url = req.query.url ? urlParser.parse(req.query.url) : undefined;
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

        let fileName = urlParser.parse(url).pathname.split('/').pop();
        let extension = fileName.split('.').pop();
        if(!this.validateExtension(extension)) {
            res.send('The file specified must be an image');
            this.logger.error('File is not an image');
            return;
        }

        let hashKey = crypto.createHash('md5').update(fileName).digest('hex') + '.' + extension;
        let filePath = this.config.server.downloadDir + '/' + hashKey;
        let resizePath = this.config.server.resizeDir + '/' + hashKey;

        //check if image is already downloaded
        this.db.get(hashKey)
            .then(record => {
                let storedHeight = resizeHeight ? resizeHeight : '';
                if(record && record.resizeWidth === resizeWidth.toString() && record.resizeHeight === storedHeight.toString()) {
                    this.logger.info('Downloading from cache');
                    res.download(resizePath);
                    return;
                }
                if(record) {
                    this.logger.info('Using cache');
                    this.processImage({
                        filePath: filePath,
                        fileName: hashKey,
                        url: url.href,
                        resizeWidth: resizeWidth,
                        resizeHeight: resizeHeight ? resizeHeight : '',
                    }, resizePath, res);

                    return;
                }

                this.downloadImage(url, filePath)
                    .then(image => {
                        this.processImage({
                            filePath: image,
                            fileName: hashKey,
                            url: url.href,
                            resizeWidth: resizeWidth,
                            resizeHeight: resizeHeight ? resizeHeight : '',
                        }, resizePath, res);
                        this.logger.info('File saved successfully');
                    })
                    .catch(error => {
                        this.logger.error(error);
                        res.send('An error occurred. Please try again later');
                    });

            })
            .catch(error => {
                this.logger.error(error);
            });
    }

    /**
     * Check if picture is in a valid format
     * @param extension
     * @returns {boolean}
     */
    validateExtension(extension) {
        let valid = ['jpg', 'jpeg', 'png', 'tiff', 'bmp', 'gif'];

        return valid.indexOf(extension) >= 0;
    }

    /**
     * resize pictures and store metadata in db
     * @param options
     * @param resizePath
     * @param res
     */
    processImage(options, resizePath, res) {
        //get image metadata and store it in redis
        this.imageResizer.getInfo(options.filePath)
            .then(metadata => {
                options.metadata = JSON.stringify(metadata);
                this.db.save(options.fileName, options);
            })
            .catch(error => {
                this.logger.error(error);
            });

        //download resized picture when done
        let callback = () => {
            return res.download(resizePath, options.filePath, (error) => {
                if(error) {
                    this.logger.error(error);
                }
            });
        };
        this.imageResizer.resize(options.filePath, options.resizeWidth, options.resizeHeight, resizePath, callback);

    }

    /**
     * Downloads the picture from the specified url
     * @param url
     * @param filePath
     * @returns {Promise}
     */
    downloadImage(url, filePath) {
        return new Promise((resolve, reject) => {
            let protocol = url.protocol === 'http:' ? http : https;
            let request = protocol.get(url, (res) => {
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

    /**
     * Starts the server
     */
    start() {
        this.app.listen(this.config.server.port, () => {
            console.log('Server started on port ' + this.config.server.port);
        });
    }

}

module.exports = Server;