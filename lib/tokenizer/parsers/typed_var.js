'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _literal = require('../literals/literal');

var _literal2 = _interopRequireDefault(_literal);

var _var = require('../literals/var');

var _var2 = _interopRequireDefault(_var);

var _lex = require('../tok/lex');

var _lex2 = _interopRequireDefault(_lex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var L = _literal2.default;
var V = _var2.default;

class CheddarTypedVariableToken extends _lex2.default {
    exec() {
        this.open(false);

        // TODO: capture type name (L)
        return this.grammar(true, [[[L, ':']], V]);
    }
}
exports.default = CheddarTypedVariableToken;
module.exports = exports['default'];