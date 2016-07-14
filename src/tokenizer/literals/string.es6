import CheddarPrimitive from './primitive';
import {STRING_ESCAPES, STRING_DELIMITERS, STRING_ESCAPE} from '../consts/chars';
import * as CheddarError from '../consts/err';

import {ClassType} from '../consts/types';

export default class CheddarStringToken extends CheddarPrimitive {
    exec() {

        this.open();

        let chr = this.getChar();
        if (STRING_DELIMITERS.indexOf(chr) > -1) {
            let loc = this.Index - 1;
            // in a string

            let qt = chr; // store quote
            let esc;

            while ((chr = this.getChar())) {
                if (chr === qt) {
                    break;
                } else if (this.isLast) {
                    this.Index = loc;
                    return this.error(CheddarError.UNMATCHED_DELIMITER);
                } else if (chr === STRING_ESCAPE) {
                    this.addToken(
                        STRING_ESCAPES.has(esc = this.getChar()) ?
                        STRING_ESCAPES.get(esc) :
                        esc
                    );
                } else {
                    this.addToken(chr);
                }
            }

            return this.close();

        } else {
            return this.error(CheddarError.EXIT_NOTFOUND);
        }
    }

    get Type() { return ClassType.String }
}