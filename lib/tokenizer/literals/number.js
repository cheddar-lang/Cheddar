'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _primitive = require('./primitive');

var _primitive2 = _interopRequireDefault(_primitive);

var _chars = require('../consts/chars');

var _err = require('../consts/err');

var CheddarError = _interopRequireWildcard(_err);

var _types = require('../consts/types');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CheddarNumberToken extends _primitive2.default {
    exec() {

        this.open(false);

        let chr = this.getChar(); // Get first char

        // Ensure it starts with a digit or decimal
        if (_chars.DIGITS.indexOf(chr) > -1 || _chars.NUMBER_DECIMALS.indexOf(chr) > -1) {

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
            let base;

            if (second_char) second_char = second_char.toLowerCase();

            if (_chars.BASE_IDENTIFIERS.indexOf(second_char) > -1) {
                // if it's a different base
                base = _chars.BASE_RESPECTIVE_NUMBERS[_chars.BASE_IDENTIFIERS.indexOf(second_char)];
                ++this.Index;
            } else {
                base = 10;
                --this.Index; // take it back now y'all
            }

            this.newToken(base);
            let digit_set = _chars.NUMERALS.slice(0, base);

            // add bitshift as token
            if (base !== 10) this.newToken(chr);else this.newToken(0);

            // Integer Parsing
            this.newToken();

            let decimal_parsed = false;

            // Loop through literal
            while (chr = this.getChar())
            // Within base range?
            if (digit_set.indexOf(chr.toUpperCase()) > -1) this.addToken(chr);
            // If is a decimal and no decimals have occured yet
            else if (_chars.NUMBER_DECIMALS.indexOf(chr) > -1 && decimal_parsed === false) decimal_parsed = true, this.addToken(chr);
                // Is a digit seperator e.g. _
                else if (_chars.NUMBER_GROUPING.indexOf(chr) > -1) {
                            // Not the first or last integer digit
                            if (this.last && digit_set.indexOf(this.Code[this.Index].toUpperCase()) > -1) continue;else return this.error(CheddarError.UNEXPECTED_TOKEN);
                    } else break;

            // If no digits were found in the literal
            if (!this.last) return this.error(CheddarError.UNEXPECTED_TOKEN); // throw compile error

            --this.Index;
            return this.close(); // Close the parser
        } else {
                return this.error(CheddarError.EXIT_NOTFOUND); // Safe exit
            }
    }

    get Type() {
        return _types.ClassType.Number;
    }
}
exports.default = CheddarNumberToken;
module.exports = exports['default'];