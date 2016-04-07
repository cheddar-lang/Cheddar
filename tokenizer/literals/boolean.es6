import CheddarPrimitive from './primitive';
import * as CheddarError from '../consts/err';

export default class CheddarBooleanToken extends CheddarPrimitive {
    exec() {
        if (this.curchar === 't' &&
            this.Code[this.Index + 1] === 'r' &&
            this.Code[this.Index + 2] === 'u' &&
            this.Code[this.Index + 3] === 'e') {
            this.Index += 4;
            this.Tokens = true;
            return this.close();
        }
        
        if (this.curchar === 'f' &&
            this.Code[this.Index + 1] === 'a' &&
            this.Code[this.Index + 2] === 'l' &&
            this.Code[this.Index + 3] === 's' &&
            this.Code[this.Index + 4] === 'e') {
            this.Index += 5;
            this.Tokens = false;
            return this.close();
        }
        
        return this.close(CheddarError.EXIT_NOTFOUND);
    }
}