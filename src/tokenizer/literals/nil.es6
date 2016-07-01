import CheddarPrimitive from './primitive';
import * as CheddarError from '../consts/err';

import {ClassType} from '../consts/types';

export default class CheddarNilToken extends CheddarPrimitive {
    exec() {
        if (this.curchar === 'n' &&
            this.Code[this.Index + 1] === 'i' &&
            this.Code[this.Index + 2] === 'l') {
            this.Index += 3;
            return this.close();
        }

        return this.close(CheddarError.EXIT_NOTFOUND);
    }

    get Type() { return ClassType.Boolean }
}