var sinon = require('sinon');
var assert = require('chai').assert;
var expect = require('chai').expect;
var xpath = require('../../../lib/path');
var path = require('path');

describe("path", function() {
    it("is object", function(done) {
        assert.isObject(xpath);
        done();
    });
    
    it("should find package.json", function(done) {
        var p = xpath.find(__dirname, 'package.json');
        assert.isNotNull(p, 'should not be null');
        
        var relp = path.relative(__dirname, p);
        assert.equal(relp, '../../../package.json', 'should match relative path');
        done();
    });
    
    it("should return null", function(done) {
        var p = xpath.find(__dirname, 'not-found-8sdf98as8fsdf.json');
        assert.isNull(p, 'should be null');
        done();
    });
});