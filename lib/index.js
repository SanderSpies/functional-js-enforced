module.exports = function(babel) {
  var t = babel.types;
  // console.log(t);
  return new babel.Transformer('functional-js-enforced', {

    VariableDeclaration(node) {
      if (node.kind === 'var') {
        throw new Error('[functional-js-enforced] Var declaration is not allowed. Use const or let instead');
      }
      else {
      //  console.log('foo:', node);
      }
    },

    Super() {
      throw new Error ('[functional-js-enforced] super is not supported');
    },

    FunctionExpression() {
      throw new Error ('[functional-js-enforced] function expression is not supported. Use a function declaration instead.');
    },

    FunctionDeclaration(node, parent, state) {

      // ensure only assignments to local values
      let locallyDeclaredVariables = {};
      this.traverse({
        VariableDeclarator(node) {
          locallyDeclaredVariables[node.id.name] = true;
          return node;
        },
        AssignmentExpression(node, x, scope) {
          let name = node.left.name;
          if (!locallyDeclaredVariables[name]) {
            throw new Error('[functional-js-enforced] You are trying to assign a value to a non-local value.');
          }
        },
        FunctionDeclaration(node) {
          this.skip();
        }
      }, state)
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

    AssignmentExpression(node, x ,scope) {
      let left = node.left.name;
      //console.log(left.isReference());
      //et ids = this.getBindingIdentifiers();
      //let name = node.left.name;
      //console.log(scope.getFunctionParent().block);
      //console.log(ids, node.left.name, scope, scope.getOwnBinding(node.left.name));
    }
  });

};

