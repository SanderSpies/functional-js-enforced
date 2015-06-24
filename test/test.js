var transform = require('babel-core').transform;


transform('let o = 1; function f() {' +
'function z() {  let d =[];  d[0] = {Q: 1}; ' +
'return 1;' +
'} return 2;}', {plugins: ['../lib/index.js']});