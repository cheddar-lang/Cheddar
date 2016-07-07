import CheddarLexer from '../tok/lex';
import CheddarExpressionToken from './expr';
import CheddarCodeblock from '../patterns/block';
import CheddarArrayToken from './array';
import CheddarArgumentToken from './argument';
import CheddarCustomLexer from './custom';

export default class CheddarFunctionToken extends CheddarLexer {
    exec() {
        this.open(false);

        this.jumpWhite();

        const E = CheddarExpressionToken;
        const A = CheddarCustomLexer(CheddarArrayToken, '(', ')', CheddarArgumentToken);

        /**
         This basically runs the following:

         "->" ARG_LIST? (CODE BLOCK | EXPRESSION)

         */

        let grammar = this.grammar(true,
            [[A], "->", [CheddarCodeblock, CheddarExpressionToken]]
        );
        //console.log(grammar);
        return grammar;
    }
}