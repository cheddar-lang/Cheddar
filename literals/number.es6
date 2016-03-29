import CheddarLiteral from './literal';
import {DIGITS, NUMERALS, BASE_IDENTIFIERS, BASE_RESPECTIVE_NUMBERS} from '../chars';
import * as CheddarError from '../err/list';

export default class CheddarNumberTok extends CheddarLiteral {
    exec() {

        this.open();

        let chr = this.getchar();

        if (DIGITS.indexOf(chr) > -1 || chr === ".") {

            chr = this.getchar();

            let digit_set = DIGITS;
            let digit_base = BASE_IDENTIFIERS.indexOf(chr);

            if (digit_base > -1) {
                digit_set =
                    NUMERALS.slice(0, BASE_RESPECTIVE_NUMBERS[BASE_IDENTIFIERS.indexOf(chr)]);
                this.addtoken(chr);
            } else {
                this.addtoken('0');
            }
            
            this.newtoken();

            let decimal = digit_set === DIGITS;
            
            while ( digit_set.indexOf(chr = this.getchar()) > -1 ) {
                if (
            }
            
        } else {
            return this.close(CheddarError.EXIT_NOTFOUND);
        }
    }
}