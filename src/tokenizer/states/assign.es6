import CheddarLexer from '../tok/lex';

import CheddarExpressionToken from '../parsers/expr';
import CheddarTypedVariableToken from '../parsers/args/typed_var';

import * as CheddarError from '../consts/err';

export default class StatementAssign extends CheddarLexer {
    exec() {
        this.open(false);

        let DEFS = ['var', 'let', 'const'];
        return this.grammar(true,
            [
                DEFS, this.jumpWhite, CheddarTypedVariableToken, [':=', '='], CheddarError.ALLOW_ERROR, CheddarExpressionToken
            ],
            [
                DEFS, this.jumpWhite, CheddarTypedVariableToken
            ]
        );
    }
}