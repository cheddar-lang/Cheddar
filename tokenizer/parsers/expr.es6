// Cheddar Expression Parser
import O from '../literals/op';
import P from './property';
import L from './typed';
import F from './function';
import CheddarLexer from '../tok/lex';
import CheddarShuntingYard from '../tok/shunting_yard';
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
        const ε = [];

        let t= this.grammar(true,
            [O, E, α],
            [O, α],
            ε
        );

        console.log("expr' val:", t);
        return t;
    }

    get isExpression() { return true; }
}

export default class CheddarExpressionToken extends CheddarLexer {
    exec() {
        this.open(false);

        this.jumpWhite();

        const E = CheddarExpressionToken;
        const α = CheddarExpressionTokenAlpha;
        let grammar = this.grammar(true,
            [F, α], // <- this may or may not be a good idea
            // how else would it work?
            // not sure but this gives ir a really high presedence
            // over things such as parenthesized expressions
            // yeah, but functions always start with ->/=>/~>; paren expressions don't
            [O, E, α],
            ['(', E, ')', α],
            [B, α],
            [P, α],
            [L, α]
        );
        console.log('grammar result:', grammar);
        return grammar;
    }

    get isExpression() { return true; }
}