import {ClassType} from '../../../tokenizer/consts/types';

export default class CheddarString extends String {
    static create(Token) {
        let ret;
        if (!Token.tok)
            ret = new CheddarString(Token);
        else
            ret = new CheddarString(Token.tok());
        if (require) ret.Type = ClassType.String;
        //node patch
        return ret;
    }

    get Type() { return ClassType.String; }
}