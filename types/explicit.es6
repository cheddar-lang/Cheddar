// Explicit type literals
import CheddarParser from '../tok/parser';
import CheddarLexer from '../tok/lex';
import * as Literal from './types';

export default class CheddarAnyLiteral extends CheddarLexer {
    // <Literal.Token><WHITE>:<WHITE><Literal.-Token>
    exec() {
        let Parser = new CheddarParser();
        Parser.parse(Literal.Token);
        return Parser
    }
}