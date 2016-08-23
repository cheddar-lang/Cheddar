// Functionized operators
import {OP, UOP} from '../consts/ops';
import CheddarPrimitive from './primitive';
import CheddarError from '../consts/err';

const OPERATORS = UOP.concat(OP).sort((a, b) => b.length - a.length)

export default class CheddarFunctionizedOperatorToken extends CheddarPrimitive {
    exec() {
        let FOP = this.grammar(true, [
            '(', OP.concat(UOP), [':'], ')'
        ]);

        return FOP;
    }
}