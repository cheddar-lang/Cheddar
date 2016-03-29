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
export const DIGITS = "0123456789";
export const ALPHA  = "abcdefghijklmnopqrstuvwxyz";
export const UALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const MALPHA = ALPHA + UALPHA;

export const NUMERALS = `0123456789ABCDEF`;

export const WHITESPACE = "\r\n\t\f ";

export const TOKEN_START = MALPHA + "$_";
export const TOKEN_END = TOKEN_START + DIGITS;

/*== Operator Constants ==*/

export const OP = [
    ['!'],
    ['^'],
    ['*', '/', '%'],
    ['+', '-'],
    ['<=', '>=', '<', '>'],
    ['=', '!='],
    [':=', '+=', '-=', '*=', '/=', '^=']
];

export const UOP = [
    ['sqrt', 'cos', 'sin', 'sign'],
    ['-', '+']
];

export const SYMBOL_FILTER = `!%&*+-:<=>@\^|~`;

/*== Parse Data ==*/
export const STRING_DELIMITERS = ['\'', '"'];
export const STRING_ESCAPE = `\\`;

/*== Number Data ==*/
export const BASE_IDENTIFIERS = [ 'b', 'o', 'h' ];
export const BASE_RESPECTIVE_NUMBERS = [2, 8, 16];

/*== Conflict Data ==*/
export const RESERVED = ['sqrt', 'cos', 'sin', 'sign'];