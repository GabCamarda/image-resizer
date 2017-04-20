"use strict";

const sharp = require('sharp');

class ImageResizer {

    constructor(config, logger) {
        this.config = config;
        this.logger = logger;
    }

    resize(image, width, height, filePath) {
        sharp(image)
            .resize(width, height)
            .toFile(filePath, (error) => {
                if(error) {
                    this.logger.error(error);
                }
            });
            // .then(() => {
            //     if(callback) {
            //         callback();
            //     }
            // });
    }

    getInfo(image) {
        return sharp(image).metadata();
    }
}

module.exports = ImageResizer;