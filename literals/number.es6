import CheddarLiteral from './literal';
import {DIGITS, NUMERALS, BASE_IDENTIFIERS, BASE_RESPECTIVE_NUMBERS, NUMBER_GROUPING, NUMBER_DECIMALS} from '../chars';
import * as CheddarError from '../err/list';

export default class CheddarNumberTok extends CheddarLiteral {
    exec() {

        this.open();

        let chr = this.getChar();

        if (DIGITS.indexOf(chr) > -1 || NUMBER_DECIMALS.indexOf(chr) > -1) {

            chr = this.Code[this.Index];

            let digit_set = DIGITS;
            let digit_base = BASE_IDENTIFIERS.indexOf(chr);

            if (digit_base > -1) {
                let base = BASE_RESPECTIVE_NUMBERS[BASE_IDENTIFIERS.indexOf(chr)];
                digit_set = NUMERALS.slice(0, base);
                this.addToken(base); // Add the base number as a token
            } else {
                this.addToken(10); // base 10
                --this.Index; // Go back to the beginning of the literal
            }

            this.newToken(); // Start new token

            // ensure digits are valid in base
            while (chr = this.getChar())
                if (digit_set.indexOf(chr) > -1)
                    this.addToken(chr);
                else if (NUMBER_GROUPING.indexOf(chr) > -1)
                    if (this.last && digit_base.indexOf(this.Code[this.Index]) > -1)
                        continue;
                    else
                        this.error(CheddarError.UNEXPECTED_TOKEN);
                else
                    break; // continue parsing

            // this.jumpWhite() // uncomment to allow whitespace before decimal

            // if there were no digits and it's not a decimal
            if (!this.last && NUMBER_DECIMALS.indexOf(chr) === -1) {
                --this.Index; // Go back a char
                this.error(CheddarError.EXIT_NOTFOUND); // Respond that it's not a number
            }

            // if it's at a decimal
            if (NUMBER_DECIMALS.indexOf(chr) > -1) {
                // this.jumpWhite() // Uncomment to allow whitespace after decimal
                this.addToken(chr);
                while (chr = this.getChar())
                    if (digit_set.indexOf(chr.toUpperCase()) > -1)
                        this.addToken(chr);
                    else
                        break;
            }

            return this.close();

        } else {
            return this.error(CheddarError.EXIT_NOTFOUND);
        }
    }
}