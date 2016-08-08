// Functionized operators
import {OP, UOP} from '../consts/ops';
import CheddarPrimitive from './primitive';
import CheddarError from '../consts/err';

export default class CheddarFunctionizedOperatorToken extends CheddarPrimitive {
    exec() {
        let FOP = this.grammar(true, [
            '(', OP.concat(UOP), ')'
        ]);

        return FOP;
    }
}