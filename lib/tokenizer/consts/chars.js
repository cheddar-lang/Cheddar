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
  * NUMBER_GROUPING number grouping delimiters
  * NUMBER_DECIMALS decimal point to use 
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

const WHITESPACE = exports.WHITESPACE = '\r\n\f '; // Add \t here to allow tabs

const TOKEN_START = exports.TOKEN_START = MALPHA + '$_';
const TOKEN_END = exports.TOKEN_END = TOKEN_START + DIGITS;

/*== Operator Constants ==*/

/*== Parse Data ==*/
const STRING_DELIMITERS = exports.STRING_DELIMITERS = ['\'', '"'];
const STRING_ESCAPE = exports.STRING_ESCAPE = '\\';

const SYMBOL_FILTER = exports.SYMBOL_FILTER = '!%&*+-:<=>@\^|~';

const NUMBER_GROUPING = exports.NUMBER_GROUPING = ['_'];
const NUMBER_DECIMALS = exports.NUMBER_DECIMALS = ['.'];

const EXPR_OPEN = exports.EXPR_OPEN = '(';
const EXPR_CLOSE = exports.EXPR_CLOSE = ')';

/*== Array Data ==*/
const ARRAY_OPEN = exports.ARRAY_OPEN = '[';
const ARRAY_CLOSE = exports.ARRAY_CLOSE = ']';
const ARRAY_SEPARATOR = exports.ARRAY_SEPARATOR = ',';

/*== Number Data ==*/
const BASE_IDENTIFIERS = exports.BASE_IDENTIFIERS = ['b', 'o', 'x'];
const BASE_RESPECTIVE_NUMBERS = exports.BASE_RESPECTIVE_NUMBERS = [2, 8, 16];

/*== Conflict Data ==*/
const RESERVED = exports.RESERVED = ['sqrt', 'cos', 'sin', 'sign'];