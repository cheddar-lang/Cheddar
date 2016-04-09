'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lex = require('../tok/lex');

var _lex2 = _interopRequireDefault(_lex);

var _var = require('../literals/var');

var _var2 = _interopRequireDefault(_var);

var _typed_var = require('./typed_var');

var _typed_var2 = _interopRequireDefault(_typed_var);

var _expr = require('./expr');

var _expr2 = _interopRequireDefault(_expr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CheddarArgumentToken extends _lex2.default {
    exec() {
        //why not just argument - array handles the rest - var
        // ah, okay
        this.open(false);

        const V = _var2.default;
        const E = _expr2.default;
        const T = _typed_var2.default;

        // this can become:
        /*
        [V, [['=', E]]]
        */
        return this.grammar(true, [T, [["?"]], [['=', E]]]);
    }
}
exports.default = CheddarArgumentToken;
module.exports = exports['default'];