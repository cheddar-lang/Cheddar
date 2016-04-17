export default class CheddarProperty {
    constructor(Tokens, Arguments) {
        this.Tokens = Tokens;
        this.Arguments = Arguments;
    }

    create(Token) {
        let ret = new CheddarProperty();
        for (let i = 0, token; token = Token.tok(i); i++) {
            if (token.constructor.name  === 'CheddarTokens')
                ret.Arguments.push([i, token._Tokens]);
            else if(token.constructor.name  === 'CheddarVariableToken')
                ret.Tokens.push(token.tok());
            else
                ret.Tokens.push(token);
        }
        return ret;
    }
}