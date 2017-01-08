var TestCheddarFrom = require('../globals').TestCheddarFrom;
var chai = require('chai');

describe('Math', function(){
    describe('E', function(){
        it('should work', TestCheddarFrom.Code(
            `print Math.E`,
            `2.718281828459045`
        ))
    });

    describe('PI', function(){
        it('should work', TestCheddarFrom.Code(
            `print Math.PI`,
            `3.141592653589793`
        ))
    });

    describe('PHI', function(){
        it('should work', TestCheddarFrom.Code(
            `print Math.PHI`,
            `1.618033988749894`
        ))
    });

    describe('MILL', function(){
        it('should work', TestCheddarFrom.Code(
            `print Math.MILL`,
            `1.30637788386308`
        ))
    });

    describe('GAMMA', function(){
        it('should work', TestCheddarFrom.Code(
            `print Math.GAMMA`,
            `0.577215664901532`
        ))
    });

    describe('AVOGADRO', function(){
        it('should work', TestCheddarFrom.Code(
            `print Math.AVOGADRO`,
            `6.02214086`
        ))
    });

    describe('fib', function(){
        it('should work', TestCheddarFrom.Code(
            `print Math.fib(10)`,
            `55`
        ))
    });

    describe('primes', function(){
        it('should work with zero', TestCheddarFrom.Code(
            `print Math.primes(0)`,
            `[]`
        ))

        it('should work with large values', TestCheddarFrom.Code(
            `Math.primes(1000)`,
            ``
        ))
    });

    describe('isprime', function(){
        it('should be false', TestCheddarFrom.Code(
            `print Math.isPrime(10)`,
            `false`
        ))

        it('should be true', TestCheddarFrom.Code(
            `print Math.isPrime(11)`,
            `true`
        ))
    });

    describe('rand', function(){
        it('should work', TestCheddarFrom.Code(
            `let n = Math.rand(); print n < 1 && n >= 0`,
            `true`
        ))
    });

    describe('factor', function(){
        it('should work with 64', TestCheddarFrom.Code(
            `print Math.factor(64)`,
            `[1, 2, 4, 8, 16, 32, 64]`
        ))
    });
});
