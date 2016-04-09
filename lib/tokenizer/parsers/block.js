'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _expr = require('./expr');

var _expr2 = _interopRequireDefault(_expr);

var _exprs = require('./exprs');

var _exprs2 = _interopRequireDefault(_exprs);

var _blocks = require('../consts/blocks');

var _lex = require('../tok/lex');

var _lex2 = _interopRequireDefault(_lex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CheddarBlockToken extends _lex2.default {
    exec() {
        this.open(false);

        this.jumpWhite();

        let E = _expr2.default,
            S = _exprs2.default,
            B = _blocks.BLOCK_NAMES;

        return this.grammar(true, [B, '(', E, ')', '{', S, '}']);
    }
}
exports.default = CheddarBlockToken;
module.exports = exports['default'];