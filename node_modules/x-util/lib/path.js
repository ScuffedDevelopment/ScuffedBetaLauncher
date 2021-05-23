/* jshint node:true */

'use strict';

var path    = require('path');
var fs      = require('fs');

// find('/test/path/', 'config')
function find(search, findstr){
    var parts = search.split(path.sep);
    for (var i = parts.length; i > 0; i--) {
        var p = path.join(parts.splice(0, i).join(path.sep), findstr);
        if (fs.existsSync(p)){
            return p;
        }
    }
    return null;
}

module.exports = {
    find: find
};