"use strict";

const mocha = require('mocha');
const expect = require('expect');
const sinon = require('sinon');
const Db = require('../db');

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