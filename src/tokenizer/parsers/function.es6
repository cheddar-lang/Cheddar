import CheddarExpressionToken from '../states/expr';
import CheddarCodeblock from '../patterns/block';
import CheddarArrayToken from './array';
import CheddarArgumentToken from './args/argument';
import CheddarCustomLexer from './custom';
import CheddarPrimitive from '../literals/primitive';

export default class CheddarFunctionToken extends CheddarPrimitive {
    exec() {
        this.open(false);

        this.jumpWhite();

        const E = CheddarExpressionToken;
        const A = CheddarCustomLexer(CheddarArrayToken, '(', ')', CheddarArgumentToken, true);

        /**
         This basically runs the following:

         "->" ARG_LIST? (CODE BLOCK | EXPRESSION)

         */

        let grammar = this.grammar(true,
            [[A], "->", [CheddarCodeblock, CheddarExpressionToken]]
        );

        return grammar;
    }
}