var transform = require('babel-core').transform;

transform('var M = 2; var tttt = 2; class foo {pleh(){console.log(this);}} new foo(); let o = 1; function f() {tttt = 55; ' +
'function z() { return 5;  let d =[];  d[0] = {Q: 1}; ' +
'return 1;' +
'} return 2;}', {plugins: ['../lib/index.js']});

