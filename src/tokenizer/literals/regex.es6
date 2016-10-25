import CheddarPrimitive from './primitive';
import * as CheddarError from '../consts/err';
import {REGEX_DELIMITER, REGEX_ESCAPE, REGEX_FLAGS} from '../consts/chars';

export default class CheddarRegexToken extends CheddarPrimitive {
    exec() {

        this.open();

        if (this.getChar() === REGEX_DELIMITER) {
            let loc = this.Index - 1;
            // in a regex
            if ('*/'.includes(this.Code[this.Index])) return CheddarError.EXIT_NOTFOUND;

            let chr;

            while ((chr = this.getChar())) {
                if (chr === REGEX_DELIMITER) {
                    break;
                } else if (this.isLast) {
                    this.Index = loc;
                    return this.error(CheddarError.UNMATCHED_DELIMITER);
                } else if (chr === REGEX_ESCAPE) {
                    this.addToken(REGEX_ESCAPE + this.getChar());
                } else {
                    this.addToken(chr);
                }
            }

            // Match flags
            this.newToken(); // Flag to store token
            while (REGEX_FLAGS.indexOf(this.Code[this.Index]) > -1) {
                this.addToken(this.Code[this.Index++]);
            }

            return this.close();

        } else {
            return this.error(CheddarError.EXIT_NOTFOUND);
        }
    }
}