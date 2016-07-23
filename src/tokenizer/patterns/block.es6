import CheddarLexer from '../tok/lex';
import CheddarCustomParser from '../parsers/custom';
import * as CheddarError from '../consts/err';

export default class CheddarCodeblock extends CheddarLexer {
    exec({
        tok: tokenizer,
        args: {
            ENDS,
            PARSERS
        }
    } = {
        tok: require('../tok'),
        args: {}
    }) {
        if (!this.lookAhead("{"))
            return CheddarError.EXIT_NOTFOUND;

        this.jumpLiteral("{");

        let RUN = this.initParser(tokenizer);
        let RES = RUN.exec("}", PARSERS);

        this.Index = RES.Index || RUN.Index;
        if (RUN.Errored || !(RES instanceof CheddarLexer))
            return this.error(RES);

        this.Index = RES.Index;
        this.Tokens = RES;

        this.jumpWhite();
        if (this.jumpLiteral("}") === false) {
            return this.error(CheddarError.UNEXPECTED_TOKEN);
        }

        return this.close();
    }
}