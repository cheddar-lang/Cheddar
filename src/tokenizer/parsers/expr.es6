// Cheddar Expression Parser
import O from '../literals/op';
import P from './property';
import L from './typed';
import F from './function';
import CheddarLexer from '../tok/lex';
import {OP, UOP, EXPR_OPEN, EXPR_CLOSE} from '../consts/ops';

// Special Exceptions
import B from '../literals/boolean';

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

class CheddarExpressionTokenAlpha extends CheddarLexer {
    exec() {
        this.open(false);

        this.jumpWhite();

        const E = CheddarExpressionToken;
        const α = CheddarExpressionTokenAlpha;
        // Setting ε to a terminating terminal
        // not sure about this but I'll add a
        // special control character for that
        const ε = [];

        return this.grammar(true,
        //  ['?', E, ':', E] // ternary
            [O, E, α],
            [O, α],
            ε
        );
    }

    get isExpression() { return true; }
}

export default class CheddarExpressionToken extends CheddarLexer {
    exec() {
        this.open(false);

        this.jumpWhite();

        const E = CheddarExpressionToken;
        const α = CheddarExpressionTokenAlpha;

        return this.grammar(true,
            [/*[[V]], */F, α], // <- this may or may not be a good idea
            // how else would it work?
            // not sure but this gives ir a really high presedence
            // over things such as parenthesized expressions
            // yeah, but functions always start with ->/=>/~>; paren expressions don't
            [O, E, α],
            ['(', E, ')', α],
            [B, α],
            [P, α],
            [L, α],
            [P, [':=', []], E] //so '=' is captured
        );
    }

    get isExpression() { return true; }
}