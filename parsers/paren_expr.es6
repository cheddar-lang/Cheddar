import * as CheddarError from '../consts/err';
import CheddarExpressionToken from './expr';
import CheddarLexer from '../tok/lex';

class CheddarParenthesizedExpression extends CheddarLexer {
    exec() {
        this.open(false);
        
        if (this.getChar() !== "(")
            this.error(CheddarError.EXIT_NOTFOUND);
        
        this.jumpWhite();
        
        let expressionParser = this.initParser(CheddarExpressionToken).exec();
        if (!(expressionParser instanceof CheddarLexer))
            this.error(CheddarError.UNEXPECTED_TOKEN);
        
        this.Tokens = expressionParser.Tokens;
        this.Index = expressionParser.Index;
        
        this.jumpWhite();
        
        if (this.getChar() !== ")")
            this.error(CheddarError.UNMATCHED_DELIMITER);
        
        this.close();
    }
}