import CheddarLiteral from './literal';
import {DIGITS, NUMERALS, BASE_IDENTIFIERS, BASE_RESPECTIVE_NUMBERS, NUMBER_GROUPING, NUMBER_DECIMALS} from '../chars';
import * as CheddarError from '../err/list';

export default class CheddarNumberTok extends CheddarLiteral {
    exec() {

        this.open(false);

        let chr = this.getChar(); // Get first char
        
        // Ensure it starts with a digit or decimal
        if (DIGITS.indexOf(chr) > -1 || NUMBER_DECIMALS.indexOf(chr) > -1) {
            
            // Is a number
            // Parses in two parts:
            // 1. determining the base
            // 2. parsing the integer
            // 3. parsing the decimal
            // Errors are handled each step
            // Fatal errors only occur with
            //  number seperators
            
            // Base Determination
            
            let second_char = this.Code[this.Index]; // Gets the next character
            let digit_set;
            
            if (BASE_IDENTIFIERS.indexOf(second_char) > -1) {
                // if it's a different base
                let base = BASE_RESPECTIVE_NUMBERS[BASE_IDENTIFIERS.indexOf(second_char)];
                digit_set = NUMERALS.slice(0, base);
                this.newToken(base);
            } else {
                this.newToken(10);
                digit_set  = DIGITS;
                --this.Index; // take it back now y'all
            }
            
            // Integer Parsing
            this.newToken();
            
            let decimal_parsed = false
            
            // Loop through literal
            while (chr = this.getChar())
                // Within base range?
                if (digit_set.indexOf(chr) > -1)
                    this.addToken(chr);
                // If is a decimal and no decimals have occured yet
                else if (NUMBER_DECIMALS.indexOf(chr) > -1 && decimal_parsed === false)
                    (decimal_parsed = true, this.addToken(chr));
                // Is a digit seperator e.g. _
                else if (NUMBER_GROUPING.indexOf(chr) > -1)
                    // Not the first or last integer digit
                    if (this.last && digit_set.indexOf(this.Code[this.Index]) > -1)
                        continue;
                    else
                        return this.error(CheddarError.UNEXPECTED_TOKEN);
                else
                    break;
                    
            // If no digits were found in the literal
            if (!this.last)
                return this.error(CheddarError.EXIT_NOTFOUND); // Safe exit
            
            this.done(); // Close the parser
            
        } else {
            return this.error(CheddarError.EXIT_NOTFOUND); // Safe exit
        }
    }
}