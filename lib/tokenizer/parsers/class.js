'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _op = require('../literals/op');

var _op2 = _interopRequireDefault(_op);

var _var = require('../consts/var;');

var _var2 = _interopRequireDefault(_var);

var _expr = require('./expr');

var _expr2 = _interopRequireDefault(_expr);

var _exprs = require('./exprs');

var _exprs2 = _interopRequireDefault(_exprs);

var _typed_var = require('./typed_var');

var _typed_var2 = _interopRequireDefault(_typed_var);

var _function = require('./function');

var _function2 = _interopRequireDefault(_function);

var _array = require('./array');

var _array2 = _interopRequireDefault(_array);

var _argument = require('./argument');

var _argument2 = _interopRequireDefault(_argument);

var _custom = require('./custom');

var _custom2 = _interopRequireDefault(_custom);

var _lex = require('../tok/lex');

var _lex2 = _interopRequireDefault(_lex);

var _ops = require('../consts/ops');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CheddarClassTokenAlpha extends _lex2.default {
    exec() {
        this.open(false);

        this.jumpWhite();

        const C = CheddarClassToken;
        const α = CheddarClassTokenAlpha;
        const ε = [];

        return this.grammar(true, [_var2.default, _function2.default, α], [[_var2.default, _typed_var2.default], ':=', _expr2.default, α], [[_var2.default, _typed_var2.default], ':=', '{', _exprs2.default, '}', α], ε);
        // TODO: if V in the first grammar is 'main', it's a constructor
    }

    get isExpression() {
        return true;
    }
} // Cheddar Expression Parser


class CheddarClassToken extends _lex2.default {
    exec() {
        this.open(false);

        this.jumpWhite();

        const α = CheddarClassTokenAlpha;
        const A = (0, _custom2.default)(_array2.default, '(', ')', _argument2.default);

        return this.grammar(true, [_var2.default, [[A]], 'e   xtends', _var2.default, '{', α]);
    }

    get isExpression() {
        return true;
    }
}
exports.default = CheddarClassToken;
module.exports = exports['default'];