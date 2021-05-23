var sinon = require('sinon');
var assert = require('chai').assert;
var expect = require('chai').expect;
var command = require('../../../lib/command');

describe("command", function() {
    it("is constructed", function(done) {
        assert.isObject(command);
        done();
    });
    
    it("should parse arguments", function(done) {
        var o = command.parse([ '-a:1', '-b', '/my/path/to/file' ], { a: 5, b: false, text: 'none' });
        assert.deepEqual(o, { a: '1', b: true, text: '/my/path/to/file' }, "should match parsed result");
        done();
    });
});