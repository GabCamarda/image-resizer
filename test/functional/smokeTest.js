"use strict";

const mocha = require('mocha');
const expect = require('expect');
const sinon = require('sinon');
const http = require('http');
const fs = require('fs');
const config = require('../../config');
const app = require('../../app');
const Db = require('../../db');

const db = new Db(config, {});

describe('Smoke test', () => {
    let baseUrl = 'http://localhost:' + config.server.port;

    it('should connect to the server', done => {
        http.get(baseUrl, res => {
            expect(res.statusCode).toEqual(200);
            done();
        });
    });

    it('should return an error if missing width', done => {
        let url = baseUrl + '/resize';
        http.get(url, res => {
            expect(res.statusCode).toEqual(400);
            done();
        });
    });

    it('should return an error if missing url', done => {
        let url = baseUrl + '/resize?width=123';
        http.get(url, res => {
            expect(res.statusCode).toEqual(400);
            done();
        });
    });

    it('should download and resize the specified picture', done => {
        let url = baseUrl + '/resize?width=123&url=http://hd.wallpaperswide.com/thumbs/best_hd-t2.jpg';
        http.get(url, res => {
            expect(res.statusCode).toEqual(200);
            expect(fs.readdirSync(config.server.downloadDir).length).toEqual(1);
            expect(fs.readdirSync(config.server.resizeDir).length).toEqual(1);
            done();
        });
    });


    after(() => {
        app.disconnect();
        let files = [];
        files.push(fs.readdirSync(config.server.downloadDir));
        files.forEach(file => {
            fs.unlinkSync(config.server.downloadDir + '/' + file);
            fs.unlinkSync(config.server.resizeDir + '/' + file);
        });
        db.clear();
    });

});