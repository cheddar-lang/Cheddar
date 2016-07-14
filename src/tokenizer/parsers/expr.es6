// Cheddar Expression Parser
import O from '../literals/op';
import P from './property';
import F from './function';
import CheddarLexer from '../tok/lex';
import { OP, UOP, EXPR_OPEN, EXPR_CLOSE } from '../consts/ops';
import * as CheddarError from '../consts/err';
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
The following grammar should work

ternary -> α β ? E : E
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

let UNARY = CheddarCustomLexer(O, true);

// Class Prototypes
class CheddarExpressionToken extends CheddarLexer { isExpression = true }
class CheddarExpressionTokenAlpha extends CheddarLexer { isExpression = true }
class CheddarExpressionTokenBeta extends CheddarLexer { isExpression = true }

let E = CheddarCustomLexer(CheddarExpressionToken, false);

// Ternary
// Solely for reference
class CheddarExpressionTernary extends CheddarLexer {}

// ALPHA
CheddarExpressionTokenAlpha.prototype.exec = function() {
    this.open(false);

    this.jumpWhite();

    return this.grammar(true, [F],
        // ['(', E, ')'],
        [UNARY, E], // Prefix
        [P]
    );
};

// BETA
CheddarExpressionTokenBeta.prototype.exec = function() {
    this.open(false);

    this.jumpWhite();

    return this.grammar(true, [O, E], //infix
        // [O], // postfix
        [] // ε
    );
};

// MASTER
CheddarExpressionToken.prototype.exec = function(ALLOW_TERNARY = true) {
    this.open(false);

    this.jumpWhite();

    let expression = this.grammar(true, [
        CheddarExpressionTokenAlpha, CheddarExpressionTokenBeta
    ]);

    /** == Ternary Handling == **/
    if (ALLOW_TERNARY) {
        // Lookahead for ternary `?`
        if (!this.lookAhead("?")) {
            // If it doesn't exist, just exit
            return expression;
        }
        // Increase index past the `?`
        this.Index++;

        // Now we know it's a ternary
        // parse the tail, `E : E`

        // Parse the first expression
        let TAIL_TRUE = this.initParser(CheddarExpressionToken);
        let IFT = TAIL_TRUE.exec();

        // Set the index of the expression
        this.Index = IFT.Index || TAIL_TRUE.Index;

        // Error if applicable
        if (!(IFT instanceof CheddarLexer))
            return this.error(IFT);

        // IF True
        if (!this.lookAhead(":")) {
            // Expected a `:`
            return this.error(CheddarError.UNEXPECTED_TOKEN);
        }
        // Increase past the `:`
        this.Index++;

        // Parse the second expression
        let TAIL_FALSE = this.initParser(CheddarExpressionToken);
        let IFF = TAIL_FALSE.exec()

        this.Index = IFF.Index || TAIL_FALSE.Index;
        if (!(IFF instanceof CheddarLexer))
            return this.error(IFF);

        let Ternary = new CheddarExpressionTernary();
        Ternary.Index = this.Index;
        Ternary._Tokens = [
            this._Tokens.slice(0), // Token from this.grammar
            IFT, IFF
        ];

        this._Tokens = [Ternary];

        return this.close();
    } else {
        return expression;
    }
};

export default CheddarExpressionToken;