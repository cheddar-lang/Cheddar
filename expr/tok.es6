import {DIGITS, ALPHA, UALPHA, MALPHA, NUMERALS, WHITESPACE, OP, UOP, SYMBOL_FILTER} from '../chars';
import CheddarTokens from '../tok/tks'; // Import Tokenizer class
import CheddarTok from '../tok/tok'; // Import Tokens Class

// Set data
const OPLIST = [].concat(...OP.concat(UOP));

// Symbol operators
const UOLIST = OPLIST.filter(
    op => op.split("").every(
        o => SYMBOL_FILTER.indexOf(o)));

const Tokenize = (c, i = 0, r = false) => {

    // c - input
    // i - index
    // r - expect recursed


    // tokens
    // |- properties
    // |   |- unary prop operators
    // |- digit
    // |   |- integers
    // |   |- decimals
    // |   |- bases
    // |       |- binary
    // |       |- hexadecimal
    // |- binary operators
    // |- unary operators

    const tok_list = [];

    main: for (; i < c.length; i++) {

        // whitespace

        if (WHITESPACE.indexOf(c[i]) > -1) continue; // Ignore whitespace


        // properties

        if (MALPHA.indexOf(c[i]) > -1) { // Alpha beginning

            let tok = c[i]; // Token variable

            i++;

            while (i < c.length) { // Get char

                if (MALPHA.indexOf(c[i]) > -1) {
                    tok += c[i++]; // next char
                }
                else {
                    // Go back and eit;
                    --i;
                    break;
                }

            }

            if (OPLIST.indexOf(tok) == -1) {
                // return [1, "Unknown operator"];
            }

            tok_list.push(tok);
            continue;
        }


        // digits

        if (DIGITS.indexOf(c[i]) > -1 || c[i] === "." || c[i] === "-") {
            if (c[i] === "-") i++;
            let tok = (c[i - 1] === "-" ? "-" : "") + (c[i] === "." ? "0." : c[i]); //
            let dec = c[i] === "."; // is a decimal?

            i++;

            while (i < c.length) {

                if (DIGITS.indexOf(c[i]) > -1) {
                    tok += c[i++]; 
                }

                else if (c[i] == ".") {

                    if (dec === true) {

                        // decimal after a decimal in the number already occured
                        return [i, [1, "Repeated decimal"]];

                    }
                    else {

                        tok += c[i];

                        i++;
                        if (DIGITS.indexOf(c[i ]) > -1) {
                            tok += c[i];
                        } else {
                            return [i, [1, `Unexpected token after decimal: ${c[i]}`]];
                        }

                        dec = true;
                        i++;
                    }

                }

                else if (c[i - 1] === '0' && c[i]) { // backreference for 0

                    // MARK: BASE CONVERSIONS
                    // base conversions:
                    //             012   4567 10  16
                    const bases = `ubt???soni?d???x`;
                    const b = bases.indexOf(c[i]); // base #
                    const numerals = NUMERALS.slice(0, b + 1); // numerals

                    tok += c[i];

                    if (ALPHA.indexOf(bases[b]) > -1) { // valid base id
                        while (i < c.length) {
                            i++;
                            if (NUMERALS.indexOf(c[i]) > -1) { // Is a numberal

                                if (numerals.indexOf(c[i]) > -1) tok += c[i];
                                else return [i, [1, `Numeral out of specified base range`]];

                            } else {
                                break;
                            }

                        }

                    } else {
                        return [i, [1, `Unexpected base op \`${c[i]}\``]];
                    }

                    dec =  true;

                }

                else {
                    --i;
                    break;
                }

            }

            tok_list.push(tok);
            continue;

        }

        if (c[i] === "(") { // expression

            // runs tokenizer on nested expresson
            // Ensure 
            let nest_res = Tokenize(c, i + 1, true);

            tok_list.push(nest_res[1]);
            i = nest_res[0];

            continue;

        }

        if (c[i] === r) { // exit expression level

            // should it be exiting?
            // checks if `r`, the recurse
            // variable is set which
            // is set by a to-nest
            // expression.

            break;

        }

        // Match an operator
        // Greedy matches largest operator
        if (SYMBOL_FILTER.indexOf(c[i]) > -1) {

            // Pending possible operators
            // Used to hold ambiguous choices.
            let PENDING_OP = c[i];
            let STATE_DONE = false;

            // Ensure operator exists
            //if (<U/D>.length === 0)
            //    return [i, [1, `Unknown operator ${PENDING_OP}`]];

            // While:
            //  1. ambiougous op
            // &2. code len + 1
            while (i <= c.length) {

                if (i === c.length) {
                    // End of file
                    // Errors for two reasons:
                    //  1. Ambiguous Op
                    //  2. Postfix OP
                    return [i, [1, `Unexpected EOF when tokenizing expression`]];
                }

                // Next char
                i++;

                // If it's a symbol disambiguate
                if (SYMBOL_FILTER.indexOf(c[i])) {

                    let OP_COPY = PENDING_OP + c[i]; // store working operator

                    // If the operator exists
                    if (UOLIST.indexOf(OP_COPY) > -1)
                        PENDING_OP = OP_COPY; // store it
                    else
                        STATE_DONE = true; // interpret operator state

                } else {
                    STATE_DONE = true; // interpret operator state
                }

                if (STATE_DONE) {
                    // Not a symbol character
                    // backup, and send for parsing

                    // First add to stack
                    tok_list.push(PENDING_OP);

                    --i;
                    continue main; // next char
                }
            }
        }

    }

    return [i, new CheddarTokens(tok_list)];
    
};

export default class CheddarTokExpression extends CheddarTok {
    constructor(Code = "", Index = 0) {
        super(Code, Index)
    }
    exec(Recurse = false) {
        let Result = Tokenize(this.Code, this.Index, Recurse);
        [this.Index, this.Tokens] = Result;
        return this;
    }
}