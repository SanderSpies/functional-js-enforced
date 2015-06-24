var transform = require('babel-core').transform;


transform('let o = 1; function f() {' +
'let x = 2; ' +
'function z(d) {  let x = 4; let o = 3; d.push({Q: 1}); if (true) { let G =3;   x = 3 + 5 }' +
'return 1;' +
'} z("foo"); return 2;}', {plugins: ['../lib/index.js']});