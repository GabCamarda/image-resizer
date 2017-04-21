"use strict";

const mocha = require('mocha');
const expect = require('expect');
const fs = require('fs');
const config = require('../../config');
const Logger = require('../../logger');
const ImageResizer = require('../../resizer');

describe('Image resizer testcase', () => {
    let imageResizer = new ImageResizer(config, new Logger(config));
    let testImageDir = __dirname + '/../testImages';
    let testImageResizedDir = testImageDir + '/resized/';
    let testImageResizedPic = testImageResizedDir + '/cat.jpg';

    before((done) => {
        imageResizer.resize(testImageDir + '/cat.jpg', 200, '', testImageResizedPic, done);
    });

    it('should have resized a picture and saved it', (done) => {
        setTimeout(() => {
            expect(fs.readdirSync(testImageResizedDir).length).toEqual(1);
            done();
        }, 20);
    });

    after(() => {
        fs.unlinkSync(testImageResizedPic);
        imageResizer = null;
    });

});