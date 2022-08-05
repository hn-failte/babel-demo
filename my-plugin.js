const t = require("@babel/core").types;

module.exports = function() {
    return {
      visitor: {
        LogicalExpression(path) {
          if (path.node.operator !== "??") {
            return;
          }

          const leftOperand = path.node.left;
          const rightOperand = path.node.right;

          const leftId = path.scope.generateUidIdentifierBasedOnNode(leftOperand);
          path.scope.push({ id: t.cloneNode(leftId) });
          const assignment = t.assignmentExpression("=", leftId, leftOperand);

          const nullTest = t.binaryExpression("!==", assignment, t.nullLiteral());
          const undefinedTest = t.binaryExpression(
            "!==",
            leftId,
            path.scope.buildUndefinedNode()
          );
          const test = t.logicalExpression("&&", nullTest, undefinedTest);

          const conditionalExpression = t.conditionalExpression(
            test,
            leftId,
            rightOperand
          );

          path.replaceWith(conditionalExpression);
        },
        Identifier(path, state) {
          const name = path.node.name;
          // console.log('path.node', path.node)
          path.node.name = String(name).toLowerCase();
        },
        FunctionDeclaration(path, state) {
          console.log('path:', path)
        },
        // VariableDeclarator(path, state) {
        //   const value = path.node.init.value
        //   path.node.init.value = String(value).toLowerCase();
        // },
      },
    };
};
