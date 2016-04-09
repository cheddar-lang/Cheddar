'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _op = require('../literals/op');

var _op2 = _interopRequireDefault(_op);

var _property = require('./property');

var _property2 = _interopRequireDefault(_property);

var _typed = require('./typed');

var _typed2 = _interopRequireDefault(_typed);

var _function = require('./function');

var _function2 = _interopRequireDefault(_function);

var _lex = require('../tok/lex');

var _lex2 = _interopRequireDefault(_lex);

var _ops = require('../consts/ops');

var _boolean = require('../literals/boolean');

var _boolean2 = _interopRequireDefault(_boolean);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
For Reference, the orginal grammar is:

E -> O E
     E O E?
     ( E )
     B
     P
     L

Made right-recursive:

E -> O E α
     ( E ) α
       α  <-- This is where any custom grammars go
     B α
     P α
     L α

α -> O E α
     O α
     ε

Combined into one expression:

E -> (OE|(E)|P|L|B)[OE|O]

where groups are only nested to a depth of one
*/

class CheddarExpressionTokenAlpha extends _lex2.default {
    exec() {
        this.open(false);

        this.jumpWhite();

        const E = CheddarExpressionToken;
        const α = CheddarExpressionTokenAlpha;
        const ε = [];

        return this.grammar(true, [_op2.default, E, α], [_op2.default, α], ε);
    }

    get isExpression() {
        return true;
    }
}

// Special Exceptions
// Cheddar Expression Parser


class CheddarExpressionToken extends _lex2.default {
    exec() {
        this.open(false);

        this.jumpWhite();

        const E = CheddarExpressionToken;
        const α = CheddarExpressionTokenAlpha;

        return this.grammar(true, [/*[[V]], */_function2.default, α], // <- this may or may not be a good idea
        // how else would it work?
        // not sure but this gives ir a really high presedence
        // over things such as parenthesized expressions
        // yeah, but functions always start with ->/=>/~>; paren expressions don't
        [_op2.default, E, α], ['(', E, ')', α], [_boolean2.default, α], [_property2.default, α], [_typed2.default, α], [_property2.default, [':=', []], E] //so '=' is captured
        );
    }

    get isExpression() {
        return true;
    }
}
exports.default = CheddarExpressionToken;
module.exports = exports['default'];