"use strict";

const mocha = require('mocha');
const expect = require('expect');
const sinon = require('sinon');
const config = require('../../config');
const Logger = require('../../logger');

const logger = new Logger(config);

describe('Logger testcase', () => {
    let spy = sinon.spy(console, 'log');

    it('should log error message', () => {
        let message = 'error';
        logger.error(message);
        expect(spy.calledWith(config.logger.consoleColours.error, message, config.logger.consoleColours.reset)).toEqual(true);
    });

    it('should log warning message', () => {
        let message = 'warning';
        logger.warning(message);
        expect(spy.calledWith(config.logger.consoleColours.warning, message, config.logger.consoleColours.reset)).toEqual(true);
    });

    it('should log info message', () => {
        let message = 'info';
        logger.info(message);
        expect(spy.calledWith(config.logger.consoleColours.info, message, config.logger.consoleColours.reset)).toEqual(true);
    });

});

