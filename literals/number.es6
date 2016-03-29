import CheddarLiteral from './literal';
import {DIGITS, NUMERALS, BASE_IDENTIFIERS, BASE_RESPECTIVE_NUMBERS, NUMBER_GROUPING, NUMBER_DECIMALS} from '../chars';
import * as CheddarError from '../err/list';

export default class CheddarNumberToken extends CheddarLiteral {
    exec() {
        this.open();

        //TODO: this.Code[this.Code.length] to get base as last character?
        //i.e. 1001b instead of b1001
        //then this.Code = this.Code.slice(0, -1)
        let chr = this.getChar().toLowerCase();
        let digit_set = [];
        let digit_base = BASE_IDENTIFIERS.indexOf(chr);

        if (digit_base > -1) {
            let base = BASE_RESPECTIVE_NUMBERS[digit_base];
            digit_set = NUMERALS.slice(0, base);
            this.addToken(base); // Add the base number as a token
        } else {
            digit_set = DIGITS;
            this.addToken(10); // base 10
            --this.Index; // Go back to the beginning of the literal
        }

        this.newToken(); // Start new token

        // ensure digits are valid in base
        while (chr = this.getChar()) {
            chr = chr.toUpperCase();
            if (digit_set.indexOf(chr) > -1)
                this.addToken(chr);
            else if (NUMBER_GROUPING.indexOf(chr) > -1)
                if (this.last) //&& digit_base.indexOf(this.Code[this.Index]) > -1) //TODO: digit_base?!
                    continue;
                else
                    this.error(CheddarError.UNEXPECTED_TOKEN);
            else {
                this.Index--;
                break; // continue parsing
            }
        }

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
            while (chr = this.getChar()) {
                chr = chr.toUpperCase();
                if (digit_set.indexOf(chr) > -1)
                    this.addToken(chr);
                else if (NUMBER_GROUPING.indexOf(chr) > -1)
                    continue;
                else
                    this.error(CheddarError.EXIT_NOTFOUND);
            }
        }
        
        if (this.getChar()) {//didn't finish parsing
        //TODO: implement peek() that doesn't increment index?
            this.Index--;
            this.error(CheddarError.EXIT_NOTFOUND);
        }

        return this.close();
    }
}