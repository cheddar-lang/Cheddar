import {ClassType} from '../../../tokenizer/consts/types';

export default class CheddarNumber extends Number {
    static create(Token) {
        if (!Token.tok)
            return new CheddarNumber(Token);
        return new CheddarNumber(
            (Token.tok(2).includes('.') ? parseFloat : parseInt)
            (Token.tok(2) + '0'.repeat(Token.tok(1)), Token.tok())
        );
    }

    get Type() { return ClassType.Number; }
}