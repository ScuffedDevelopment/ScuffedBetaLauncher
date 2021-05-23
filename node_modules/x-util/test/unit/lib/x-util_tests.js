var sinon = require('sinon');
var assert = require('chai').assert;
var expect = require('chai').expect;
var xUtil = require('../../../lib/x-util');

describe("x-util", function() {
    it("is object", function(done) {
        assert.isObject(xUtil);
        done();
    });
    
    it("has contract", function(done) {
        assert.ok(xUtil.command === require('../../../lib/command'));
        assert.ok(xUtil.strings === require('../../../lib/strings'));
        assert.ok(xUtil.json === require('../../../lib/json'));
        assert.ok(xUtil.path === require('../../../lib/path'));
        
        var common = require('../../../lib/common');
        assert.ok(xUtil.extend === common.extend);
        done();
    });
});