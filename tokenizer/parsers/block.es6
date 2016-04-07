import CheddarExpressionToken from './expr';
import CheddarExpressionsToken from './exprs';
import {BLOCK_NAMES} from '../consts/blocks';
import CheddarLexer from '../tok/lex';

export default class CheddarBlockToken extends CheddarLexer {
    exec() {
        this.open(false);

        this.jumpWhite();

        let E = CheddarExpressionToken,
            S = CheddarExpressionsToken,
            B = BLOCK_NAMES;

        return this.grammar(true,
            [B, '(', E, ')', '{', S, '}']
        );
    }
}