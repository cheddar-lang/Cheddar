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
export const DIGITS = '0123456789';
export const ALPHA  = 'abcdefghijklmnopqrstuvwxyz';
export const UALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const MALPHA = ALPHA + UALPHA;

export const NUMERALS = '0123456789ABCDEF';

export const WHITESPACE = '\r\n\f '; // Add \t here to allow tabs

export const TOKEN_START = MALPHA + '_$';
export const TOKEN_END = TOKEN_START + DIGITS;

/*== Operator Constants ==*/


/*== Parse Data ==*/
export const STRING_DELIMITERS = ['\'', '"'];
export const STRING_ESCAPE = '\\';

export const SYMBOL_FILTER = '!%&*+-:<=>@\^|~';

export const NUMBER_GROUPING = ['_'];
export const NUMBER_DECIMALS = ['.'];

export const EXPR_OPEN  = '(';
export const EXPR_CLOSE = ')'

/*== Regex Data ==*/
export const REGEX_DELIMITER = '/';
export const REGEX_ESCAPE = '\\';
export const REGEX_FLAGS = 'nsxgimc';

/*== Array Data ==*/
export const ARRAY_OPEN  = '[';
export const ARRAY_CLOSE = ']';
export const ARRAY_SEPARATOR = ',';

/*== String Data ==*/
export const STRING_ESCAPES = new Map([
    ['0', String.fromCharCode(0)],
    ['a', String.fromCharCode(8)],
    ['b', '\b'],
    ['t', '\t'],
    ['n', '\n'],
    ['v', '\v'],
    ['f', '\f'],
    ['r', '\r'],
    ['e', String.fromCharCode(27)],
]);

/*== Number Data ==*/
export const BASE_IDENTIFIERS = [ 'b', 'o', 'x' ];
export const BASE_RESPECTIVE_NUMBERS = [2, 8, 16];

/*== Conflict Data ==*/
export const RESERVED = ['sqrt', 'cos', 'sin', 'sign'];