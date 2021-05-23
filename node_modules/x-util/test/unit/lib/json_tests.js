var sinon = require('sinon');
var assert = require('chai').assert;
var expect = require('chai').expect;
var json = require('../../../lib/json');

describe("json", function() {
    it("is object", function(done) {
        assert.isObject(json);
        done();
    });
    
    describe(":find", function(){
        it("should find property", function(done) {
            var actual = json.find({ a: 1, b: { c: { d: 'hello' } } }, '/b/c/d');
            assert.equal(actual, 'hello', "should match found results");
            done();
        });
    });
    
    describe(":resolveLinks", function(){
        it("should resolve links", function(done) {
            var actual = json.resolveLinks({ a: 1, _b: '/a' }, '/b/c/d');
            assert.deepEqual(actual, { a: 1, b: 1 }, "should match linked results");
            done();
        });
        it("should resolve recursive links", function(done) {
            var actual = json.resolveLinks({ _b: '/z/d', c: 1, z: { d: 5 } });
            assert.deepEqual(actual, { z: { d: 5 }, b: 5, c: 1 }, "should match linked results");
            done();
        });
        
        it("should resolve relative links", function(done) {
            var actual = json.resolveLinks({ a: 'Hello', _b: 'a' });
            assert.deepEqual(actual, { a: 'Hello', b: 'Hello' }, "should match relative results");
            done();
        });
    });
});