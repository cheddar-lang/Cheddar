'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lex = require('../tok/lex');

var _lex2 = _interopRequireDefault(_lex);

var _expr = require('./expr');

var _expr2 = _interopRequireDefault(_expr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CheddarExpressionsToken extends _lex2.default {
    exec() {
        this.open(false);

        let E = _expr2.default,
            S = CheddarExpressionsToken;

        return this.grammar(true, [E, ';', S], [E]);
    }

    get isExpression() {
        return true;
    }
}
exports.default = CheddarExpressionsToken;
module.exports = exports['default'];