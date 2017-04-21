"use strict";

const sharp = require('sharp');

class ImageResizer {

    constructor(config, logger) {
        this.config = config;
        this.logger = logger;
    }

    /**
     * Resize pictures maintaining ratio
     * @param image
     * @param width
     * @param height
     * @param filePath
     * @param callback
     */
    resize(image, width, height, filePath, callback) {
        let validHeight = height !== '' ? height : undefined;
        sharp(image)
            .resize(width, validHeight)
            .toFile(filePath, (error) => {
                if(error) {
                    this.logger.error(error);
                }
                if(callback) {
                    callback();
                }
            });
    }

    /**
     * Returns specified image metadata
     * @param image
     * @returns {*}
     */
    getInfo(image) {
        return sharp(image).metadata();
    }
}

module.exports = ImageResizer;