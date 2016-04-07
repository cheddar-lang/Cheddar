/*
 * DEFAULT Operators
 * OP - Operators
 * UOP - Unary operators
**/
// TODO: should these be split into pre/postfix?
// I'm not sure. Does it matter?
export const UNARY = [ 'sin', 'cos', 'tan', 'sign', 'sqrt' ];

// wat. i thought trig was unary/prefix
export const OP = [ '!', '^', '*', '/', '%', '+', '-', '<=', '>=', '<', '>', '=', '!=', ':=', '+=', '-=', '*=', '/=', '^=' ].concat(UNARY);

// from https://msdn.microsoft.com/en-AU/library/6a71f45d.aspx
// extras are just in case they are added in the future
// note: lambda counts as an operator, like assignment
// in multiples of 1000 for more flexibility of user-defined operators
// TODO: make them multiples of 1024 instead?
// left out unary and primary

// TODO: how will the user modify this?
export const PRECEDENCE = new Map([
    ['sqrt', 15000], //temporary - I have no idea where they go
    ['cos', 15000],
    ['sin', 15000],
    ['tan', 15000],
    ['sign', 15000],
    ['^', 14000],
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
    ['as', 10000], // safe type cast - gives null if cannot be casted
    ['is', 10000], // c# instanceof
    ['=', 9000],
    ['!=', 9000],
    ['&', 8000],
    ['xor', 7000], //xor
    ['|', 6000],
    ['&&', 5000],
    ['||', 4000],
    ['??', 3000], // null coalesce, like js' `obj1 || obj2`, if needed
    ['?:', 2000], // ternary, idk how to represent
    [':=', 1000],
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
    ['=>', 1000]
]);