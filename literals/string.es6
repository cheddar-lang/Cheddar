import CheddarLiteral from './literal';
import {STRING_DELIMITERS, STRING_ESCAPE} from '../chars';
import * as CheddarError from '../err/list';

export default class CheddarStringToken extends CheddarLiteral {
    exec() {

        this.open();

        let chr = this.getChar();

        if (STRING_DELIMITERS.indexOf(chr) > -1) {
            // in a string

            let qt = chr; // store quote

            while(chr = this.getChar())
                if (chr === qt)
                    break;
                else if (this.isLast)
                    return this.close(CheddarError.UNMATCHED_DELIMITER);
                else if (chr === STRING_ESCAPE)
                    this.addtoken(this.getChar());
                else
                    this.addToken(chr);

            return this.close();

        } else {
            return this.close(CheddarError.EXIT_NOTFOUND);
        }

    }
}