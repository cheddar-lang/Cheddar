import CheddarExpressionToken from '../states/expr';
import CheddarCodeblock from '../patterns/block';
import CheddarArrayToken from './array';
import CheddarArgumentToken from './args/argument';
import CheddarCustomLexer from './custom';
import CheddarPrimitive from '../literals/primitive';

const A = CheddarCustomLexer(CheddarArrayToken, '(', ')', CheddarArgumentToken, true);
const ExpressionToken = CheddarCustomLexer(CheddarExpressionToken, true);
export default class CheddarFunctionToken extends CheddarPrimitive {
    exec() {
        this.open(false);

        this.jumpWhite();

        /**
         This basically runs the following:

         "->" ARG_LIST? (CODE BLOCK | EXPRESSION)

         */

        let grammar = this.grammar(true,
            [[A, CheddarArgumentToken, ""], "->", [CheddarCodeblock, ExpressionToken]]
        );

        return grammar;
    }
}