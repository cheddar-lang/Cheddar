// Functionized operators
import {OP, UOP} from '../consts/ops';
import CheddarPrimitive from './primitive';
import CheddarPropertyToken from '../parsers/property';
import CheddarCustomLexer from '../parsers/custom';

export default class CheddarFunctionizedPropertyToken extends CheddarPrimitive {
    exec() {
        let FPROP = this.grammar(true, [
            '@.', CheddarCustomLexer(CheddarPropertyToken, true)
        ]);

        return FPROP;
    }
}