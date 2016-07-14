// Functionized operators
import {OP} from '../consts/ops';
import CheddarPrimitive from './primitive';

export default class CheddarFunctionizedOperatorToken extends CheddarPrimitive {
    exec() {
        return this.grammar(true, [
            '(', OP, ')'
        ]);
    }
}