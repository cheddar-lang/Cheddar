// Global tokenizer
//  tokenizes expressions and all that great stuff

import CheddarLexer from './tok/lex';

import S1_ASSIGN from './states/assign';
import S2_EXPR from './states/expr';

export default class CheddarTokenize extends CheddarLexer {
    exec() {
        const STAGES = [
            S1_ASSIGN,
            S2_EXPR
        ];

        return this.grammar(true,
            [STAGES, this.jumpSpace, ['\n', ';'], [CheddarTokenize]]
        );
    }
}