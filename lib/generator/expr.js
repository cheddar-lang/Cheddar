'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CheddarShuntingYard;

var _ops = require('../tokenizer/consts/ops');

var _primitive = require('../tokenizer/literals/primitive');

var _primitive2 = _interopRequireDefault(_primitive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Shunting Yard Implementaiton
// Converts tokenizer/parser/expr
// to a PSN stack which can be used
// to parse them.
//
// Some dependencies:
//  1. Operator prescedences
//  2. Operator stack
// I'm not sure on how this is supposed
// to work with UD-ops but the global op
// objects could be modified

// shit this is hard
function CheddarShuntingYard(expr) {
    // TODO: TODO: TODO: TODO TODO

    if (expr.constructor.name === "CheddarExpressionToken") {
        // is an expression
        // more magic
        // TO: DO

        let Output = [];
        let OpStack = [];
        /*
         * algorithm:
         * 1. Read a token
         * 2. Token is number? add to output queue
         * 3. Token is function? push to stack
         * 4.
         */

        let WorkingExpression = expr;
        let WorkingToken = WorkingExpression.GetToken;

        while (WorkingExpression) {

            if (WorkingToken) if (WorkingToken instanceof _primitive2.default || WorkingToken.constructor.name === "CheddarPropertyToken") Output.push(WorkingToken);else if (WorkingToken.constructor.name === "CheddarOperatorToken") {
                while (OpStack[OpStack.length - 1] && _ops.PRECEDENCE.get(WorkingToken.GetToken) <= _ops.PRECEDENCE.get(OpStack[OpStack.length - 1])) Output.push(OpStack.pop());
                Output.push(WorkingToken);
            } else if (WorkingToken.constructor.name === "CheddarExpressionToken") asdf;

            WorkingExpression;
        }
    } else {
        throw new TypeError("CheddarShuntingYard: did not recieve an expression for input");
    }
}
module.exports = exports['default'];