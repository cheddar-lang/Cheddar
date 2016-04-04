// Cheddar Expression Parser
import * as CheddarError from '../consts/err';

import CheddarOperatorToken from '../literals/op';
import CheddarPropertyToken from './property';
import CheddarTypedLiteral from './typed';
import CheddarLexer from '../tok/lex';
import {OP, UOP, EXPR_OPEN, EXPR_CLOSE} from '../consts/ops';


/*
Expression Grammar:

E -> O E α
     ( E ) α
     P α
     L α
α -> O E α
     O α
     ε
*/

class CheddarExpressionTokenAlpha extends CheddarLexer {
    exec() {
        this.open(false);
        
        this.jumpWhite();
        
        let E = CheddarExpressionToken;
        let α = CheddarExpressionTokenAlpha;
        let O = CheddarOperatorToken;
        let P = CheddarPropertyToken;
        let L = CheddarTypedLiteral;
        let ε = [];
        
        let grammar = this.grammar(true,
            [O, E, α],
            [O, α],
            ε
        );
        console.log(grammar);
        return grammar;
    }
}

export default class CheddarExpressionToken extends CheddarLexer {
    // set recurse to the char
    // that the parser should
    // stop an expression on
    exec(recurse = false) {
        this.open(false);
        
        this.jumpWhite();
        
        let E = CheddarExpressionToken;
        let α = CheddarExpressionTokenAlpha;
        let O = CheddarOperatorToken;
        let P = CheddarPropertyToken;
        let L = CheddarTypedLiteral;
        
        return this.grammar(true,
            [O, E, α],
            ['(', E, ')', α],
            [P, α],
            [L, α]
        );
    }
}