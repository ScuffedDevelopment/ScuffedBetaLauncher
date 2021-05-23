var sinon = require('sinon');
var assert = require('chai').assert;
var expect = require('chai').expect;
var strings = require('../../../lib/strings');

describe("strings", function() {
    it("is constructed", function(done) {
        assert.isObject(strings);
        done();
    });
    
    it("should parse string", function(done) {
        var o = strings.format('Hello {{name}}{{not-found}}', { name: 'World' });
        assert.equal(o, 'Hello World', "should match parsed result");
        done();
    });
    
    it("should throw error on invalid placeholder", function(done) {
        try{
            var o = strings.format('Hello {{name', { name: 'World' });
            assert('should throw an error');
        }
        catch(err){
            assert.instanceOf(err, Error, 'should return an error');
            done();
        }
    });
    
    it("should end with", function(done) {
        var flag = 'Hello World'.endsWith('World');
        assert.isTrue(flag, "should find endsWith");
        done();
    });
    
    it("should not find null using endsWith", function(done) {
        var flag = 'Hello World'.endsWith(null);
        assert.isFalse(flag, "should not find null");
        done();
    });
    
    it("should start with", function(done) {
        var flag = 'Hello World'.startsWith('Hello');
        assert.isTrue(flag, "should find startStr");
        done();
    });
    
    it("should not find null using startsWith", function(done) {
        var flag = 'Hello World'.startsWith(null);
        assert.isFalse(flag, "should not find null");
        done();
    });
});