/* jshint node:true */

'use strict';

function parse(args, def){
    var o = def;
    var lastArg = "text";
    for (var i = 0; i < args.length; i++) {
        if (args[i].substr(0,1) === '-'){
            var idx = args[i].indexOf(':');
            if (idx > -1){
                lastArg = args[i].substr(1, idx-1);
                o[lastArg] = args[i].substr(idx+1);
            }
            else {
                lastArg = args[i].substr(1);
                o[lastArg] = true;
            }
        }
        else {
            o.text = args[i];
        }
    }
    
    return o;
}

module.exports = {
    parse: parse
};