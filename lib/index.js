module.exports = function(babel) {
  var t = babel.types;
  //console.log(t);
  //console.log(babel);
  function error(msg) {
    console.warn('\x1b[31m[functional-js-enforced] ' + msg + '\x1b[0m');
  }

  return new babel.Transformer('functional-js-enforced', {

    VariableDeclaration(node) {
      if (node.kind === 'var') {
        error('Invalid var declaration (' + node.loc.start.line + ':' + node.loc.start.column + '). Use const or let instead.');
      }
    },

    Super() {
      error('Super is not allowed');
    },

    FunctionExpression() {
      error('Function expression is not allowed. Use a function declaration instead.');
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
          // console.log(node);
          if (!locallyDeclaredVariables[name]) {
            error('You are trying to assign a value to a non-local variable. (' + node.loc.start.line +':' + node.loc.start.column + ')');
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
       // console.log(node);
        error('Too many return statements inside function ' + node.id.name + ':' + node.loc.start.line + ':' + node.loc.start.column + '. Only one return statement is allowed.');
      }
      if (!hasReturnStatement) {
        error('Missing return statement at end of function ' + node.id.name + ':' + node.loc.start.line + ':' + node.loc.start.column + '.');
      }

    },

    ClassDeclaration(node) {
      error('Invalid class ' + node.id.name + ':' + node.loc.start.line + ':' + node.loc.start.column + '. Class declarations are not allowed.');
    },

    NewExpression(node) {
      error('Invalid new ' + node.callee.name + '():' + node.loc.start.line + ':' + node.loc.start.column + '. expression. New expressions are not allowed.');
    },

    ThisExpression(node) {
      error('this expression (' + node.loc.start.line + ':' + node.loc.start.column + ') is not allowed.');
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
      if (binding && binding.kind === 'param') {
        if (prop === 'push' || prop === 'shift' || prop === 'sort' || prop === 'splice' || prop === 'unshift' || prop === 'copyWithin' || prop === 'pop' || prop === 'reverse') {
          error('mutation of non-local variables is not allowed');
        }
      }
    }
  });

};

