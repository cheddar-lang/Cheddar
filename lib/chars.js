'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/*
 * DEFAULT CONSTANTS
 * List:
  * DIGITS  0-9
  * ALPHA   a-z
  * UALPHA  A-Z
  * MALPHA  A-Za-z
  * NUMERALS 0-9A-F
  * WHTIESPACE \s
  *
  * OP  infix operators
  * UOP unary operators 
  * SYMBOL_FILTER valid characters in operators
  *
  * STRING_DELIMITERS
  * STRING_ESCAPE
  *
  * BASE_IDENTIFIERS
  *
  * RESERVED reserved token names
**/
const DIGITS = exports.DIGITS = '0123456789';
const ALPHA = exports.ALPHA = 'abcdefghijklmnopqrstuvwxyz';
const UALPHA = exports.UALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const MALPHA = exports.MALPHA = ALPHA + UALPHA;

const NUMERALS = exports.NUMERALS = '0123456789ABCDEF';

const WHITESPACE = exports.WHITESPACE = '\r\n\t\f ';

const TOKEN_START = exports.TOKEN_START = MALPHA + '$_';
const TOKEN_END = exports.TOKEN_END = TOKEN_START + DIGITS;

/*== Operator Constants ==*/

const OP = exports.OP = [['!'], ['^'], ['*', '/', '%'], ['+', '-'], ['<=', '>=', '<', '>'], ['=', '!='], [':=', '+=', '-=', '*=', '/=', '^=']];

const UOP = exports.UOP = [['sqrt', 'cos', 'sin', 'sign'], ['-', '+']];

const SYMBOL_FILTER = exports.SYMBOL_FILTER = '!%&*+-:<=>@\^|~';

/*== Parse Data ==*/
const STRING_DELIMITERS = exports.STRING_DELIMITERS = ['\'', '"'];
const STRING_ESCAPE = exports.STRING_ESCAPE = '\\';

const NUMBER_GROUPING = exports.NUMBER_GROUPING = ['_'];
const NUMBER_DECIMALS = exports.NUMBER_DECIMALS = ['.'];

/*== Number Data ==*/
const BASE_IDENTIFIERS = exports.BASE_IDENTIFIERS = ['b', 'o', 'x'];
const BASE_RESPECTIVE_NUMBERS = exports.BASE_RESPECTIVE_NUMBERS = [2, 8, 16];

/*== Conflict Data ==*/
const RESERVED = exports.RESERVED = ['sqrt', 'cos', 'sin', 'sign'];