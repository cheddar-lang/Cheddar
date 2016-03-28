// Explicit type literals
import CheddarParser from '../tok/parser';
import CheddarLexer from '../tok/lex';
import * as Literal from './types';

export default class CheddarAnyLiteral extends CheddarLexer {
    // <Literal.Token><WHITE>:<WHITE><Literal.-Token>
    exec() {
        let Parser = new CheddarParser(this.Code, this.Index);
        
        Parser.parse(Literal.Token);
        Parser.jumpwhite();
        Parser.jumpliteral(':');
        Parser.jumpwhite();
        Parser.parse(Literal.String);
        
        return Parser
    }
}