"use strict";

const mocha = require('mocha');
const expect = require('expect');
const Db = require('../../db/index');
const config = require('../../config');

describe('Db test case', () => {
    let db = new Db(config, {});

    it('should connect to redis', () => {
        expect(db.isConnected()).toEqual(true);
    });

    it('should save arguments', () => {
        db.save('test', { test: 'test'});
        return db.get('test').then(result => {
            expect(result).toEqual({ test: 'test'});
        })
    });
});