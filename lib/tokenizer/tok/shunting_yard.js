'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _primitive = require('../literals/primitive');

var _primitive2 = _interopRequireDefault(_primitive);

var _op = require('../literals/op');

var _op2 = _interopRequireDefault(_op);

var _ops = require('../consts/ops');

var _err = require('../consts/err');

var CheddarError = _interopRequireWildcard(_err);

var _lex = require('./lex');

var _lex2 = _interopRequireDefault(_lex);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//TODO: use isPrimitive() if not deleted

//TODO: rename
//how about CheddarExpressionStackGen?
class CheddarShuntingYard extends _lex2.default {
    exec(expression) {
        if (expression && expression.Code) this.Code = expression.Code;
        if (expression && expression.Index) this.Index = expression.Index;

        // Flatten the expression
        let current = expression;
        let tokens = [];
        if (!current || !current.isExpression || current._Tokens.length > 2) return this.close(expression);

        while (current && current._Tokens.length === 2 && (current.tok(1).isExpression || // prevents import recursion
        current.tok(1) instanceof CheddarShuntingYard)) {
            if (current.tok().isExpression) //TODO: code, index
                tokens.push(new CheddarShuntingYard().exec(current.tok()));else tokens.push(current.tok());
            if (current.tok(1) instanceof CheddarShuntingYard) {
                tokens.push(current.tok(1));
                current = null;
                break;
            } else current = current.tok(1);
            //TODO: make sure this covers all cases; otherwise, see when this doesn't work
        }

        if (current && current._Tokens.length > 1) return this.error(CheddarError.UNEXPECTED_TOKEN);

        if (current && current._Tokens.length === 1) {
            if (current.tok().isExpression) tokens.push(new CheddarShuntingYard().exec(current.tok()));else tokens.push(current.tok());
        }

        // Reorder tokens
        let operators = [],
            precedences = [],
            unary = true;
        for (let i = 0; i < tokens.length; i++) {
            let token = tokens[i],
                previousPrecedence = 0;
            if (token instanceof CheddarShuntingYard) {
                for (let i = 0; i < token._Tokens.length; i++) this.Tokens = token.tok(i);
                unary = false;
            } else if (token instanceof _op2.default) {
                // It's an operator
                if (unary) token.Tokens = true;

                let precedence = (token.tok(1) ? _ops.UNARY_PRECEDENCE : _ops.PRECEDENCE).get(token);

                while (precedence <= previousPrecedence) {
                    this.Tokens = operators.pop();
                    precedences.pop();
                    previousPrecedence = precedences[precedence.length];
                }

                operators.push(token);
                precedences.push(precedence);
                previousPrecedence = precedence;
                unary = true;
            } else {
                this.Tokens = token;
                unary = false;
            }
        }

        let operator = 0;
        while (operator = operators.pop()) this.Tokens = operator;

        return this.close();
    }
}
exports.default = CheddarShuntingYard;
module.exports = exports['default'];