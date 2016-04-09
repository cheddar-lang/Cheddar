'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _paren_expr = require('./paren_expr');

var _paren_expr2 = _interopRequireDefault(_paren_expr);

var _var = require('../literals/var');

var _var2 = _interopRequireDefault(_var);

var _types = require('../consts/types');

var _array = require('./array');

var _array2 = _interopRequireDefault(_array);

var _any = require('./any');

var _any2 = _interopRequireDefault(_any);

var _lex = require('../tok/lex');

var _lex2 = _interopRequireDefault(_lex);

var _primitive = require('../literals/primitive');

var _primitive2 = _interopRequireDefault(_primitive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CheddarPropertyToken extends _lex2.default {
    exec() {
        this.open(false);

        this.Type = _types.PropertyType.Property;

        let Initial = false;

        // Plans for property parsing:
        //  1. Match <variable> ("." | end)
        //  2. Match <variable (<expr>,*<expr>)?

        while (true) {
            this.jumpWhite();

            let attempt;
            if (Initial === false) attempt = this.attempt(_var2.default, _any2.default, _paren_expr2.default);else attempt = this.initParser(_var2.default).exec();

            Initial = true;

            if (!(attempt instanceof _lex2.default)) return this.error(attempt);

            this.Index = attempt.Index;
            this.Tokens = attempt;

            if (this.curchar === '(') {
                this.jumpWhite();
                this.Type = _types.PropertyType.Method;

                let expr = this.initParser(_array2.default);
                let res = expr.exec('(', ')');

                this.Index = expr.Index;

                if (!(res instanceof _lex2.default)) return this.error(expr);

                this.Tokens = expr;
            }

            if (this.curchar === '.') {
                ++this.Index;
                continue;
            }

            if (this._Tokens.length === 1 && this._Tokens[0] instanceof _primitive2.default) return this.close(this._Tokens[0]);else return this.close();
        }
    }
}
exports.default = CheddarPropertyToken;
module.exports = exports['default'];