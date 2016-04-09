'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ = require('../');

var _2 = _interopRequireDefault(_);

var _expr = require('../parsers/expr');

var _expr2 = _interopRequireDefault(_expr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
grammar:

P  -> print P'
P' -> E L C
L -> , P' L
     ε
C ->
     \n
     ;

P ::= 'print' E(',' E)*

okay, then:

P  -> print E P'
P' -> , E P'
      ε


where P' denotes a general arg list

*/

class CheddarPrintStatementAlpha extends _2.default {
    exec() {
        this.open(false);

        const E = _expr2.default;
        const Pα = CheddarPrintStatementAlpha;

        return this.grammar(true, [',', E, Pα], []);
    }
}

class CheddarPrintStatement extends _2.default {
    exec() {
        const Pα = CheddarPrintStatementAlpha;
        const E = _expr2.default;

        return this.grammar(true, ['print', E, Pα]);
    }
}
exports.default = CheddarPrintStatement;
module.exports = exports['default'];