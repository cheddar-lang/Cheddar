// Cheddar Expression Parser
import O from '../literals/op';
import V from '../consts/var;';
import E from './expr';
import S from './exprs';
import T from './typed_var';
import F from './function';
import CheddarArrayToken from './array';
import CheddarArgumentToken from './argument';
import CheddarCustomLexer from './custom';
import CheddarLexer from '../tok/lex';
import {OP, UOP, EXPR_OPEN, EXPR_CLOSE} from '../consts/ops';

class CheddarClassTokenAlpha extends CheddarLexer {
    exec() {
        this.open(false);

        this.jumpWhite();

        const C = CheddarClassToken;
        const α = CheddarClassTokenAlpha;
        const ε = [];

        return this.grammar(true,
            [V, F, α],
            [[V, T], ':=', E, α],
            [[V, T], ':=', '{', S, '}', α],
            ε
        );
        // TODO: if V in the first grammar is 'main', it's a constructor
    }

    get isExpression() { return true; }
}

export default class CheddarClassToken extends CheddarLexer {
    exec() {
        this.open(false);

        this.jumpWhite();

        const α = CheddarClassTokenAlpha;
        const A = CheddarCustomLexer(CheddarArrayToken, '(', ')', CheddarArgumentToken);

        return this.grammar(true,
            [V, [[A]], 'e   xtends', V, '{', α]
        );
    }

    get isExpression() { return true; }
}