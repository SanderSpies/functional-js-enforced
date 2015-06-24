module.exports = function(babel) {
  var t = babel.types;
  // console.log(t);
  return new babel.Transformer('functional-js-enforced', {

    VariableDeclaration(node) {
      if (node.kind === 'var') {
        throw new Error('[functional-js-enforced] var declarations are not allowed. Use const or let instead.');
      }
    },

    VariableDeclarator(node) {
      //console.log(node.init.type === 'ArrayExpression');
    },

    Super() {
      throw new Error('[functional-js-enforced] super is not allowed');
    },

    FunctionExpression() {
      throw new Error('[functional-js-enforced] function expression is not allowed. Use a function declaration instead.');
    },

    FunctionDeclaration(node, parent, state) {
      // ensure only assignments to local values
      let locallyDeclaredVariables = {};
      let hasReturnStatement = false;
      let returnStatementCounter = 0;
      this.traverse({
        VariableDeclarator(node) {
          locallyDeclaredVariables[node.id.name] = true;
          return node;
        },
        AssignmentExpression(node, x, scope) {
          let name = node.left.object ? node.left.object.name : node.left.name;
          //console.log();
          if (!locallyDeclaredVariables[name]) {
            throw new Error('[functional-js-enforced] You are trying to assign a value to a non-local variable. ');
          }
        },
        FunctionDeclaration(node) {
          this.skip();
        },
        ReturnStatement() {
          returnStatementCounter++;
        }
      }, state);

      // enforce return statement
      let body = node.body.body;
      if (body[body.length - 1].type === 'ReturnStatement') {
        hasReturnStatement = true;
      }
      if (returnStatementCounter > 1) {
        // finicky for now :-/
        throw new Error('[functional-js-enforced] only one return statement is allowed');
      }
      if (!hasReturnStatement) {
        // finicky for now :-/
        throw new Error('[functional-js-enforced] the last statement of the function should be a return statement');
      }

    },

    ClassDeclaration() {
      throw new Error('[functional-js-enforced] class declaration is not allowed.');
    },

    NewExpression() {
      throw new Error('[functional-js-enforced] new expression is not allowed.');
    },

    ThisExpression() {
      throw new Error('[functional-js-enforced] this expression is not allowed.');
    },

    CallExpression(node, x, scope) {
      if (!node.callee.property) {
        return;
      }
      let obj = node.callee.object.name;
      let prop = node.callee.property.name;
      /**
       * - give error on `Array.prototype.push` (mutation)
       - give error on `Array.prototype.shift`  (mutation)
       - give error on `Array.prototype.sort` (mutation)
       - give error on `Array.prototype.splice` (mutation)
       - give error on `Array.prototype.unshift` (mutation)
       - give error on `Array.prototype.copyWithin` (mutation)
       - give error on `Array.prototype.pop` (mutation)
       - give error on `Array.prototype.reverse` (mutation)
       */
      let binding = scope.getOwnBinding(obj);
      if (binding.kind === 'param') {
        if (prop === 'push' || prop === 'shift' || prop === 'sort' || prop === 'splice' || prop === 'unshift' || prop === 'copyWithin' || prop === 'pop' || prop === 'reverse') {
          throw new Error('[functional-js-enforced] mutation of non-local variables is not allowed');
        }
      }
    }
  });

};

