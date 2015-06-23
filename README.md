functional-js-enforced
===
An experiment to enforce functional programming within JavaScript at build time.

Take ES6 as a given.

How to implement
---
- babel-plugin
- wondering how far scoping goes - does it give everything that's needed?

Should support:
---
- [easy] give error on `this` (OOP construct)
- [easy] give error on `class` (OOP construct)
- [easy] give error on `new` (OOP construct)
- [easy] give error `var` (implicit hoisting behaviour)

- give error when assigning value to an argument (only allow values from current scope)
- give error on `Array.prototype.push` (mutation)
- give error on `Array.prototype.shift`  (mutation)
- give error on `Array.prototype.sort` (mutation)
- give error on `Array.prototype.splice` (mutation)
- give error on `Array.prototype.unshift` (mutation)
- give error on `Array.prototype.copyWithin` (mutation)
- give error on `Array.prototype.pop` (mutation)
- give error on `Array.prototype.reverse` (mutation)
- function should always have a return (functional)
- add standard helper function `yield sleep(time)` to be able to remove setInterval, setTimeout (unclear results)
