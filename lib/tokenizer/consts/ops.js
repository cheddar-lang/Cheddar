'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/*
 * DEFAULT Operators
 * OP - Operators
 * UOP - Unary operators
**/
// TODO: should these be split into pre/postfix?
// I'm not sure. Does it matter?
// yes, it'll impact shunting-yard parsing
// but we don't have postfix yet (e.g. i++)
const UNARY = exports.UNARY = ['-', '+', 'sqrt', 'cbrt', 'sin', 'cos', 'tan', 'cosh', 'sinh', 'tanh', 'acos', 'asin', 'atan', 'acosh', 'asinh', 'atanh', 'log', 'log10', 'log1p', 'log2', 'floor', 'ceil', 'round', 'sign', 'imul', 'abs', 'clz32', 'fround', 'print'];

const OP = exports.OP = ['!', '^', '*', '/', '%', '+', '-', '<=', '>=', '<', '>', '=', '!=', ':=', '+=', '-=', '*=', '/=', '^='].concat(UNARY);

// TODO: how will the user modify this?
//TODO: fix precedence
const UNARY_PRECEDENCE = exports.UNARY_PRECEDENCE = new Map([['-', 20000], ['+', 20000], ['sqrt', 15000], ['cbrt', 15000], ['cos', 15000], ['sin', 15000], ['tan', 15000], ['cosh', 15000], ['sinh', 15000], ['tanh', 15000], ['acos', 15000], ['asin', 15000], ['atan', 15000], ['acosh', 15000], ['asinh', 15000], ['atanh', 15000], ['sign', 15000], ['log', 15000], ['log10', 15000], ['log1p', 15000], ['log2', 15000], ['imul', 15000], ['abs', 15000], ['floor', 15000], ['ceil', 15000], ['round', 15000], ['clz32', 15000], ['exp', 15000], ['expm1', 15000], ['fround', 15000], ['print', 0]]);

const PRECEDENCE = exports.PRECEDENCE = new Map([['^', 14000], ['*', 13000], ['/', 13000], ['%', 13000], ['+', 12000], ['-', 12000], ['<<', 11000], ['>>', 11000], ['<', 10000], ['>', 10000], ['<=', 10000], ['>=', 10000], ['as', 10000], // safe type cast - gives null if cannot be casted
['is', 10000], // c# instanceof
['=', 9000], ['!=', 9000], ['&', 8000], ['xor', 7000], //xor
['|', 6000], ['&&', 5000], ['||', 4000], ['??', 3000], // null coalesce, like js' `obj1 || obj2`, if needed
['?:', 2000], // ternary, idk how to represent
[':=', 1000], ['+=', 1000], ['-=', 1000], ['*=', 1000], ['/=', 1000], ['%=', 1000], ['&=', 1000], ['|=', 1000], ['^=', 1000], ['<<=', 1000], ['>>=', 1000], ['=>', 1000]]);