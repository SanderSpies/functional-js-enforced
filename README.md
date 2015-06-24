functional-js-enforced
===
An experimental babel-plugin to enforce functional programming within JavaScript at build time.

What does it do?
---
- give error on `this` (OOP construct)
- give error on `class` (OOP construct)
- give error on `new` (OOP construct)
- give error on `super` (OOP construct)
- give error `var` (unclear scoping)
- give error on function expression (unclear scoping)
- give error when assigning value to a variable outside the current function block
- function should always have a return as last statement (functional)
- function should only have one return statement

(warning shotgun approach here)
- give error on `*.push` (mutation)
- give error on `*.shift`  (mutation)
- give error on `*.sort` (mutation)
- give error on `*.splice` (mutation)
- give error on `*.unshift` (mutation)
- give error on `*.copyWithin` (mutation)
- give error on `*.pop` (mutation)
- give error on `*.reverse` (mutation)

Suggestions? Contributions?
---
Are very welcome!

License
---
MIT