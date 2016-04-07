import CheddarLexer from '../';
import CheddarExpressionToken from '../parsers/expr';

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

class CheddarPrintStatementAlpha extends CheddarLexer {
    exec() {
        this.open(false);

        const E = CheddarExpressionToken;
        const Pα = CheddarPrintStatementAlpha;

        return this.grammar(true,
            [',', E, Pα],
            []
        );
    }
}

export default class CheddarPrintStatement extends CheddarLexer {
     exec() {
         const Pα = CheddarPrintStatementAlpha;
         const E = CheddarExpressionToken;

         return this.grammar(true, ['print', E, Pα])
     }
}