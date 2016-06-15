/*
 * DEFAULT Operators
 * OP - Operators
 * UOP - Unary operators
**/
// TODO: should these be split into pre/postfix?
// I'm not sure. Does it matter?
// yes, it'll impact shunting-yard parsing
// but we don't have postfix yet (e.g. i++)
export const RESERVED_KEYWORDS = new Set(
    'sqrt', 'cbrt', 'root',
    'sin', 'cos', 'tan',
    'acos', 'asin', 'atan',
    'log', 'log2', 'log10',
    'floor', 'ceil', 'round',
    'len', 'reverse', 'abs', 'repr',
    'sign', 'print',
    'and', 'or', 'xor' );

export const OP = [
'!', '^', '*', '/', '%', '+', '-', '<=', '>=', '<', '>', '==', '&', '|',
'!=', '=', '+=', '-=', '*=', '/=', '^=', '%=', '&=', '|=', '<<', '>>', '<<=', '>>=',
':',
'@"',
'and', 'or', 'xor',
// Unary operators
'-', '+',
'sqrt', 'cbrt', 'root',
'sin', 'cos', 'tan',
'acos', 'asin', 'atan',
'log', 'log2', 'log10',
'floor', 'ceil', 'round',
'len', 'reverse', 'abs', 'repr',
'sign',
'print'];

// TODO: how will the user modify this? no idea
//TODO: fix precedence
export const UNARY_PRECEDENCE = new Map([
    ['!', 20000],
    ['-', 20000],
    ['+', 20000],
    ['@"', 17000],
    ['sqrt', 15000],
    ['cbrt', 15000],
    ['cos', 15000],
    ['sin', 15000],
    ['tan', 15000],
    ['acos', 15000],
    ['asin', 15000],
    ['atan', 15000],
    ['log', 15000],
    ['floor', 15000],
    ['ceil', 15000],
    ['abs', 15000],
    ['len', 15000],
    ['repr', 15000],
    ['reverse', 15000],
    ['round', 15000],
    ['sign', 15000],
    ['print', 0]
]);

export const PRECEDENCE = new Map([
    [':', 15000],
    ['log', 14000],
    ['root', 14000],
    ['*', 13000],
    ['/', 13000],
    ['%', 13000],
    ['+', 12000],
    ['-', 12000],
    ['@"', 12000],
    ['<<', 11000],
    ['>>', 11000],
    ['<', 10000],
    ['>', 10000],
    ['<=', 10000],
    ['>=', 10000],
    ['sign', 10000],
    ['==', 9000],
    ['!=', 9000],
    ['&', 8000],
    ['xor', 7000],
    ['|', 6000],
    ['and', 5000],
    ['or', 4000],
    ['+=', 1000],
    ['-=', 1000],
    ['*=', 1000],
    ['/=', 1000],
    ['%=', 1000],
    ['&=', 1000],
    ['|=', 1000],
    ['^=', 1000],
    ['<<=', 1000],
    ['>>=', 1000]
]);

export const RA_PRECEDENCE = new Map([
    ['^', 14000],
    ['=', 1000]
]);

export const TYPE = {
    UNARY: Symbol('Unary Operator'),
    LTR: Symbol('LTR Operator'),
    RTL: Symbol('RTL Operator')
}