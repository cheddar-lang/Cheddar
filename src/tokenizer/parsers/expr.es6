// Cheddar Expression Parser
import O from '../literals/op';
import P from './property';
import CheddarLexer from '../tok/lex';
import {OP, UOP, EXPR_OPEN, EXPR_CLOSE} from '../consts/ops';
import CheddarCustomLexer from './custom';

// Special Exceptions

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

=== Forget the above ===
With thanks to [@orlp](http://chat.stackexchange.com/transcript/message/29080854#29080854),
 errors in the above have been fixed and now the following grammar should work

Obfuscated because I'm an idiot
expr -> α β
start -> ( E )     // parenthesis
     L         // number
     B         // boolean
     P         // identifier
     prefix E  // prefix
end -> infix E   // infix
       postfix   // postfix
       ε



even worse:

E -> α β
     ε
α -> ( E )
     L
     B
     P
     O E
β -> O E?
     ε

*/

/*A -> '(' expr ')'
A -> op expr
A -> (indentifier | bool | literal)

B -> op expr?

expr -> A B*/

let UNARY = CheddarCustomLexer(O, true);

class CheddarExpressionTokenAlpha extends CheddarLexer {
    exec() {
        this.open(false);

        this.jumpWhite();

        const E = CheddarExpressionToken;

        return this.grammar(true,
            [P],
            ['(', E, ')'],
            [UNARY, E] // Prefix
        );
    }

    get isExpression() { return true; }
}

class CheddarExpressionTokenBeta extends CheddarLexer {
    exec() {
        this.open(false);

        this.jumpWhite();

        const E = CheddarExpressionToken;

        return this.grammar(true,
            [O, E], //infix
            [O], // postfix
            [] // ε
        );
    }

    get isExpression() { return true; }
}

export default class CheddarExpressionToken extends CheddarLexer {
    exec() {
        this.open(false);

        this.jumpWhite();

        return this.grammar(true,
            [CheddarExpressionTokenAlpha, CheddarExpressionTokenBeta],
            [] // ε
        );
    }

    get isExpression() { return true; }
}