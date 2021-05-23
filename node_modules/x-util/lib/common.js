/* jshint node:true */

'use strict';

function extend(obj, extended){
    for(var p in extended){
        if (obj[p] === undefined){
            obj[p] = extended[p];
        }
        else if(typeof(obj[p]) === 'object'){
            obj[p] = extend(obj[p], extended[p]);
        }
    }
    
    return obj;
}

module.exports = {
    extend: extend
};