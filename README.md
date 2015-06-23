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
- [easy] give error on `this` (OOP construct) [done]
- [easy] give error on `class` (OOP construct) [done]
- [easy] give error on `new` (OOP construct) [done]
- [easy] give error `var` (unclear scoping) [done]
- give error when assigning value to an argument (only allow values from current function scope) [done... or not?]

- give error on `Array.prototype.push` (mutation)
- give error on `Array.prototype.shift`  (mutation)
- give error on `Array.prototype.sort` (mutation)
- give error on `Array.prototype.splice` (mutation)
- give error on `Array.prototype.unshift` (mutation)
- give error on `Array.prototype.copyWithin` (mutation)
- give error on `Array.prototype.pop` (mutation)
- give error on `Array.prototype.reverse` (mutation)
- function should always have a return (functional)

- what about