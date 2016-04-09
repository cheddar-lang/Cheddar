'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _expr = require('./expr');

var _expr2 = _interopRequireDefault(_expr);

var _exprs = require('./exprs');

var _exprs2 = _interopRequireDefault(_exprs);

var _lambda = require('../consts/lambda');

var _lex = require('../tok/lex');

var _lex2 = _interopRequireDefault(_lex);

var _array = require('./array');

var _array2 = _interopRequireDefault(_array);

var _argument = require('./argument');

var _argument2 = _interopRequireDefault(_argument);

var _custom = require('./custom');

var _custom2 = _interopRequireDefault(_custom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CheddarFunctionToken extends _lex2.default {
    exec() {
        this.open(false);

        this.jumpWhite();

        const E = _expr2.default;
        const S = _exprs2.default;
        const L = _lambda.LAMBDA_ASSIGNMENT;
        const N = _lambda.LAMBDA_NO_ARGS;
        const A = (0, _custom2.default)(_array2.default, '(', ')', _argument2.default);

        let grammar = this.grammar(true, [L, A, '{', S, '}'], [L, A, E],
        //[N, '{', S, '}'],
        [N, E]);
        //console.log(grammar);
        return grammar;
    }
}
exports.default = CheddarFunctionToken;
module.exports = exports['default'];