/*
 * DEFAULT Operators
 * OP - Operators
 * UOP - Unary operators
**/

export const UD_OP = new Set();
export const UD_UOP = new Set();

export const RESERVED_KEYWORDS = new Set([
    'sqrt', 'cbrt', 'root',
    'sin', 'cos', 'tan',
    'acos', 'asin', 'atan',
    'log',
    'has',
    'floor', 'ceil', 'round',
    'abs', 'repr',
    'sign', 'print',
    'what', 'is', 'actually',
    'as',
    // States
    'var', 'const',
    'if', 'for', 'while',
    'break', 'return',
    'func', 'class',
    // Literals
    'true', 'false', 'nil'
]);

export const EXCLUDE_META_ASSIGNMENT = new Set(['==', '!=', '<=', '>=' ]);

export const OP = [
'**', '*', '/', '%', '+', '-', '<=', '>=', '<', '>', '==',
'&', '|', '^',
'&&', '||',
'!=', '=', '+=', '-=', '*=', '/=', '^=', '%=', '&=', '|=', '<<', '>>', '<<=', '>>=',
'|>', '::', 'as',
'@"', 'has',
'log', 'sign',
'root',
'is', 'actually'
].sort((a, b) => b.length - a.length);

// Unary operators
export const UOP = [
'-', '+',
'!',
'~',
'|>',
'sqrt', 'cbrt',
'sin', 'cos', 'tan',
'acos', 'asin', 'atan',
'floor', 'ceil', 'round',
'abs', 'repr',
'print',
'log', 'sign',
'@"',
'what', 'is'
];

export const UNARY_PRECEDENCE = new Map([
    ['!', 20000],
    ['-', 20000],
    ['+', 20000],
    ['|>', 18000],
    ['@"', 17000],
    ['what', 16000],
    ['~', 15000],
    ['is', 15000],
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
    ['repr', 15000],
    ['round', 15000],
    ['sign', 15000],
    ['print', 0]
]);

export const PRECEDENCE = new Map([
    ['::', 16000],
    ['@"', 15000],
    ['|>', 15000],
    ['as', 14000],
    ['log', 14000],
    ['is', 14000],
    ['actually', 14000],
    ['root', 14000],
    ['*', 13000],
    ['/', 13000],
    ['%', 13000],
    ['+', 12000],
    ['-', 12000],
    ['<<', 11000],
    ['>>', 11000],
    ['<', 10000],
    ['>', 10000],
    ['<=', 10000],
    ['>=', 10000],
    ['sign', 10000],

    ['has', 9000],
    ['==', 9000],
    ['!=', 9000],

    ['&', 8000],
    ['^', 7000],
    ['|', 6000],

    ['&&', 2001],
    ['||', 2000]
]);

export const RA_PRECEDENCE = new Map([
    ['**', 14000],
    ['+=', 1000],
    ['-=', 1000],
    ['*=', 1000],
    ['/=', 1000],
    ['%=', 1000],
    ['&=', 1000],
    ['|=', 1000],
    ['^=', 1000],
    ['<<=', 1000],
    ['>>=', 1000],
    ['=', 1000],
]);

export const TYPE = {
    UNARY: Symbol('Unary Operator'),
    LTR: Symbol('LTR Operator'),
    RTL: Symbol('RTL Operator')
}
