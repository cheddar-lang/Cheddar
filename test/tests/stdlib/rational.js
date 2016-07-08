// Rational extension written by LegionMammal978

var TestCheddarFrom = require('../globals').TestCheddarFrom;
var chai = require('chai');

describe('Rational', function(){
    describe('of', function(){
        it('should work with numeric strings (+)', TestCheddarFrom.Code(
            `print Rational.of("8")`,
            `8 / 1`
        ))
        it('should work with numeric strings (-)', TestCheddarFrom.Code(
            `print Rational.of("-8")`,
            `-8 / 1`
        ))
        it('should work with fractional strings (+)', TestCheddarFrom.Code(
            `print Rational.of("8 /  5    ")`,
            `8 / 5`
        ))
        it('should work with fractional strings (-)', TestCheddarFrom.Code(
            `print Rational.of("    -8  / 5")`,
            `-8 / 5`
        ))
        it('should work with integral numbers (+)', TestCheddarFrom.Code(
            `print Rational.of(8)`,
            `8 / 1`
        ))
        it('should work with integral numbers (-)', TestCheddarFrom.Code(
            `print Rational.of(-8)`,
            `-8 / 1`
        ))
        it('should work with decimal numbers (+)', TestCheddarFrom.Code(
            `print Rational.of(3.14)`,
            `157 / 50`
        ))
        it('should work with decimal numbers (-)', TestCheddarFrom.Code(
            `print Rational.of(-3.14)`,
            `-157 / 50`
        ))
        it('should work with approximate fractions (+)', TestCheddarFrom.Code(
            `print Rational.of(9 / 7)`,
            `9 / 7`
        ))
        it('should work with approximate fractions (-)', TestCheddarFrom.Code(
            `print Rational.of(-9 / 7)`,
            `-9 / 7`
        ))
        it('should work with length-0 arrays', TestCheddarFrom.Code(
            `print Rational.of([])`,
            `0 / 1`
        ))
        it('should work with length-1 arrays', TestCheddarFrom.Code(
            `print Rational.of([-9 / 7])`,
            `-9 / 7`
        ))
        it('should work with arrays', TestCheddarFrom.Code(
            `print Rational.of([-8 / 5, 9 / 7, 12345])`,
            `-56 / 45`
        ))
        it('should work with two args', TestCheddarFrom.Code(
            `print Rational.of(-8, 5)`,
            `-8 / 5`
        ))
        it('should work with true', TestCheddarFrom.Code(
            `print Rational.of(true)`,
            `1 / 1`
        ))
        it('should work with false', TestCheddarFrom.Code(
            `print Rational.of(false)`,
            `0 / 1`
        ))
        it('should work with other rationals', TestCheddarFrom.Code(
            `print Rational.of(Rational.of(-9, 7))`,
            `-9 / 7`
        ))
        it('should return 0 with "Infinity"', TestCheddarFrom.Code(
            `print Rational.of("Infinity")`,
            `0 / 1`
        ))
        it('should return 0 with Infinity', TestCheddarFrom.Code(
            `print Rational.of(1 / 0)`,
            `0 / 1`
        ))
        it('should return 0 with [Infinity, 1]', TestCheddarFrom.Code(
            `print Rational.of([1 / 0, 1])`,
            `0 / 1`
        ))
    });
/*
    describe('fib', function(){
        it('should work', TestCheddarFrom.Code(
            `print Math.fib(10)`,
            `55`
        ))
    });

    describe('isprime', function(){
        it('should be false', TestCheddarFrom.Code(
            `print Math.prime(10)`,
            `false`
        ))

        it('should be true', TestCheddarFrom.Code(
            `print Math.prime(11)`,
            `true`
        ))
    });*/
});
