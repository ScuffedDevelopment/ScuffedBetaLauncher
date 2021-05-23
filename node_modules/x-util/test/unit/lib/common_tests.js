var sinon = require('sinon');
var assert = require('chai').assert;
var expect = require('chai').expect;
var common = require('../../../lib/common');

describe("common", function() {
    it("is object", function(done) {
        assert.isObject(common);
        done();
    });
    
    describe(":extend", function(){
        it("should extend object", function(done) {
            var o = common.extend({ a: 1 }, { b: 2 });
            assert.deepEqual(o, { a: 1, b: 2 }, "should match extended result");
            done();
        });
        
        it("should not override existing", function(done) {
            var o = common.extend({ a: 1, b: 2 }, { b: 3 });
            assert.deepEqual(o, { a: 1, b: 2 }, "should match extended result");
            done();
        });
        
        it("should deep extend", function(done) {
            var o = common.extend({ a: 1, b: 2, c: { d: 5 } }, { c: { e: 6 } });
            assert.deepEqual(o, { a: 1, b: 2, c: { d: 5, e: 6 } }, "should match deep extended result");
            done();
        });
        
        it("should deep extend with missing object", function(done) {
            var o = common.extend({ a: 1, b: 2 }, { c: { d: 5, e: 6 } });
            assert.deepEqual(o, { a: 1, b: 2, c: { d: 5, e: 6 } }, "should match deep extended result");
            done();
        });
    });
});