/* jshint node:true */

'use strict';

var strings = require('./strings');

function resolveLinks(obj){
    return resolveLinksInternal(obj, obj);
}

function resolveLinksInternal(obj, fullObj){
    for(var p in obj){
        if (p[0] === '_' && typeof(obj[p]) === 'string'){
            var expr = obj[p];
            var o = expr.startsWith('/') ? find(fullObj, expr) : obj[obj[p]];
            obj[p.substr(1)] = o;
            delete obj[p];
        }
        else if(typeof(obj[p]) === 'object'){
            obj[p] = resolveLinksInternal(obj[p], fullObj);
        }
    }
    return obj;
}

function find(obj, path){ 
    var items = path.split('/').splice(1);
    var o = obj;
    for (var i = 0; i < items.length; i++) {
        o = o[items[i]];
    }
    return o;
}

module.exports = {
    resolveLinks: resolveLinks,
    find: find
};