import {ClassType} from '../../../tokenizer/consts/types';

export default class CheddarBoolean extends Boolean {
    static create(Token) {
        if (!Token.tok)
            return new CheddarBoolean(Token === true);
        return new CheddarBoolean(Token.tok());
    }

    get Type() { return ClassType.Boolean }
}