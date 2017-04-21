"use strict";

const mocha = require('mocha');
const expect = require('expect');
const Db = require('../../db/index');

describe('Db test case', () => {
    let db = new Db({}, {});

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