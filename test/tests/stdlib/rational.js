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
            `print Rational.of("9 /  7    ")`,
            `9 / 7`
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
            `print Rational.of(-8 / 5)`,
            `-8 / 5`
        ))
        it('should work with length-0 arrays', TestCheddarFrom.Code(
            `print Rational.of([])`,
            `0 / 1`
        ))
        it('should work with length-1 arrays', TestCheddarFrom.Code(
            `print Rational.of([9 / 7])`,
            `9 / 7`
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
            `print Rational.of(Rational.of(-8, 5))`,
            `-8 / 5`
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

    describe('num', function(){
        it('should work (instance, +)', TestCheddarFrom.Code(
            `print Rational.of(9, 7).num() - 9 / 7`,
            `0`
        ))
        it('should work (instance, -)', TestCheddarFrom.Code(
            `print Rational.of(-8, 5).num() + 8 / 5`,
            `0`
        ))
        it('should work (static, +)', TestCheddarFrom.Code(
            `print Rational.num([9, 7]) - 9 / 7`,
            `0`
        ))
        it('should work (static, -)', TestCheddarFrom.Code(
            `print Rational.num([-8, 5]) + 8 / 5`,
            `0`
        ))
    });

    describe('add', function(){
        it('should work (instance, ++)', TestCheddarFrom.Code(
            `print Rational.of(9, 7).add([9, 7])`,
            `18 / 7`
        ))
        it('should work (instance, +-)', TestCheddarFrom.Code(
            `print Rational.of(9, 7).add([-8, 5])`,
            `-11 / 35`
        ))
        it('should work (instance, -+)', TestCheddarFrom.Code(
            `print Rational.of(-8, 5).add([9, 7])`,
            `-11 / 35`
        ))
        it('should work (instance, --)', TestCheddarFrom.Code(
            `print Rational.of(-8, 5).add([-8, 5])`,
            `-16 / 5`
        ))
        it('should work (static, ++)', TestCheddarFrom.Code(
            `print Rational.add([9, 7], [9, 7])`,
            `18 / 7`
        ))
        it('should work (static, +-)', TestCheddarFrom.Code(
            `print Rational.add([9, 7], [-8, 5])`,
            `-11 / 35`
        ))
        it('should work (static, -+)', TestCheddarFrom.Code(
            `print Rational.add([-8, 5], [9, 7])`,
            `-11 / 35`
        ))
        it('should work (static, --)', TestCheddarFrom.Code(
            `print Rational.add([-8, 5], [-8, 5])`,
            `-16 / 5`
        ))
    });

    describe('sub', function(){
        it('should work (instance, ++)', TestCheddarFrom.Code(
            `print Rational.of(9, 7).sub([9, 7])`,
            `0 / 1`
        ))
        it('should work (instance, +-)', TestCheddarFrom.Code(
            `print Rational.of(9, 7).sub([-8, 5])`,
            `101 / 35`
        ))
        it('should work (instance, -+)', TestCheddarFrom.Code(
            `print Rational.of(-8, 5).sub([9, 7])`,
            `-101 / 35`
        ))
        it('should work (instance, --)', TestCheddarFrom.Code(
            `print Rational.of(-8, 5).sub([-8, 5])`,
            `0 / 1`
        ))
        it('should work (static, ++)', TestCheddarFrom.Code(
            `print Rational.sub([9, 7], [9, 7])`,
            `0 / 1`
        ))
        it('should work (static, +-)', TestCheddarFrom.Code(
            `print Rational.sub([9, 7], [-8, 5])`,
            `101 / 35`
        ))
        it('should work (static, -+)', TestCheddarFrom.Code(
            `print Rational.sub([-8, 5], [9, 7])`,
            `-101 / 35`
        ))
        it('should work (static, --)', TestCheddarFrom.Code(
            `print Rational.sub([-8, 5], [-8, 5])`,
            `0 / 1`
        ))
    });

    describe('neg', function(){
        it('should work (instance, +)', TestCheddarFrom.Code(
            `print Rational.of(9, 7).neg()`,
            `-9 / 7`
        ))
        it('should work (instance, -)', TestCheddarFrom.Code(
            `print Rational.of(-8, 5).neg()`,
            `8 / 5`
        ))
        it('should work (static, +)', TestCheddarFrom.Code(
            `print Rational.neg([9, 7])`,
            `-9 / 7`
        ))
        it('should work (static, -)', TestCheddarFrom.Code(
            `print Rational.neg([-8, 5])`,
            `8 / 5`
        ))
    });

    describe('mul', function(){
        it('should work (instance, ++)', TestCheddarFrom.Code(
            `print Rational.of(9, 7).mul([9, 7])`,
            `81 / 49`
        ))
        it('should work (instance, +-)', TestCheddarFrom.Code(
            `print Rational.of(9, 7).mul([-8, 5])`,
            `-72 / 35`
        ))
        it('should work (instance, -+)', TestCheddarFrom.Code(
            `print Rational.of(-8, 5).mul([9, 7])`,
            `-72 / 35`
        ))
        it('should work (instance, --)', TestCheddarFrom.Code(
            `print Rational.of(-8, 5).mul([-8, 5])`,
            `64 / 25`
        ))
        it('should work (static, ++)', TestCheddarFrom.Code(
            `print Rational.mul([9, 7], [9, 7])`,
            `81 / 49`
        ))
        it('should work (static, +-)', TestCheddarFrom.Code(
            `print Rational.mul([9, 7], [-8, 5])`,
            `-72 / 35`
        ))
        it('should work (static, -+)', TestCheddarFrom.Code(
            `print Rational.mul([-8, 5], [9, 7])`,
            `-72 / 35`
        ))
        it('should work (static, --)', TestCheddarFrom.Code(
            `print Rational.mul([-8, 5], [-8, 5])`,
            `64 / 25`
        ))
    });

    describe('div', function(){
        it('should work (instance, ++)', TestCheddarFrom.Code(
            `print Rational.of(9, 7).div([9, 7])`,
            `1 / 1`
        ))
        it('should work (instance, +-)', TestCheddarFrom.Code(
            `print Rational.of(9, 7).div([-8, 5])`,
            `-45 / 56`
        ))
        it('should work (instance, -+)', TestCheddarFrom.Code(
            `print Rational.of(-8, 5).div([9, 7])`,
            `-56 / 45`
        ))
        it('should work (instance, --)', TestCheddarFrom.Code(
            `print Rational.of(-8, 5).div([-8, 5])`,
            `1 / 1`
        ))
        it('should work (static, ++)', TestCheddarFrom.Code(
            `print Rational.div([9, 7], [9, 7])`,
            `1 / 1`
        ))
        it('should work (static, +-)', TestCheddarFrom.Code(
            `print Rational.div([9, 7], [-8, 5])`,
            `-45 / 56`
        ))
        it('should work (static, -+)', TestCheddarFrom.Code(
            `print Rational.div([-8, 5], [9, 7])`,
            `-56 / 45`
        ))
        it('should work (static, --)', TestCheddarFrom.Code(
            `print Rational.div([-8, 5], [-8, 5])`,
            `1 / 1`
        ))
    });

    describe('inv', function(){
        it('should work (instance, +)', TestCheddarFrom.Code(
            `print Rational.of(9, 7).inv()`,
            `7 / 9`
        ))
        it('should work (instance, -)', TestCheddarFrom.Code(
            `print Rational.of(-8, 5).inv()`,
            `-5 / 8`
        ))
        it('should work (static, +)', TestCheddarFrom.Code(
            `print Rational.inv([9, 7])`,
            `7 / 9`
        ))
        it('should work (static, -)', TestCheddarFrom.Code(
            `print Rational.inv([-8, 5])`,
            `-5 / 8`
        ))
    });

    describe('pow', function(){
        it('should work (instance, ++)', TestCheddarFrom.Code(
            `print Rational.of(9, 7).pow([9, 7]) - (9 / 7) ^ (9 / 7)`,
            `0`
        ))
        it('should work (instance, +-)', TestCheddarFrom.Code(
            `print Rational.of(9, 7).pow([-8, 5]) - (9 / 7) ^ (-8 / 5)`,
            `0`
        ))
        it('should work (instance, -+)', TestCheddarFrom.Code(
            `print Rational.of(-8, 5).pow([9, 7])`,
            `NaN`
        ))
        it('should work (instance, --)', TestCheddarFrom.Code(
            `print Rational.of(-8, 5).pow([-8, 5])`,
            `NaN`
        ))
        it('should work (static, ++)', TestCheddarFrom.Code(
            `print Rational.pow([9, 7], [9, 7]) - (9 / 7) ^ (9 / 7)`,
            `0`
        ))
        it('should work (static, +-)', TestCheddarFrom.Code(
            `print Rational.pow([9, 7], [-8, 5]) - (9 / 7) ^ (-8 / 5)`,
            `0`
        ))
        it('should work (static, -+)', TestCheddarFrom.Code(
            `print Rational.pow([-8, 5], [9, 7])`,
            `NaN`
        ))
        it('should work (static, --)', TestCheddarFrom.Code(
            `print Rational.pow([-8, 5], [-8, 5])`,
            `NaN`
        ))
    });

    describe('mod', function(){
        it('should work (instance, ++)', TestCheddarFrom.Code(
            `print Rational.of(9, 7).mod([9, 7])`,
            `0 / 1`
        ))
        it('should work (instance, +-)', TestCheddarFrom.Code(
            `print Rational.of(9, 7).mod([-8, 5])`,
            `9 / 7`
        ))
        it('should work (instance, -+)', TestCheddarFrom.Code(
            `print Rational.of(-8, 5).mod([9, 7])`,
            `-11 / 35`
        ))
        it('should work (instance, --)', TestCheddarFrom.Code(
            `print Rational.of(-8, 5).mod([-8, 5])`,
            `0 / 1`
        ))
        it('should work (static, ++)', TestCheddarFrom.Code(
            `print Rational.mod([9, 7], [9, 7])`,
            `0 / 1`
        ))
        it('should work (static, +-)', TestCheddarFrom.Code(
            `print Rational.mod([9, 7], [-8, 5])`,
            `9 / 7`
        ))
        it('should work (static, -+)', TestCheddarFrom.Code(
            `print Rational.mod([-8, 5], [9, 7])`,
            `-11 / 35`
        ))
        it('should work (static, --)', TestCheddarFrom.Code(
            `print Rational.mod([-8, 5], [-8, 5])`,
            `0 / 1`
        ))
    });

    describe('cmp', function(){
        it('should work (instance, ++)', TestCheddarFrom.Code(
            `print Rational.of(9, 7).cmp([9, 7])`,
            `0`
        ))
        it('should work (instance, +-)', TestCheddarFrom.Code(
            `print Rational.of(9, 7).cmp([-8, 5])`,
            `1`
        ))
        it('should work (instance, -+)', TestCheddarFrom.Code(
            `print Rational.of(-8, 5).cmp([9, 7])`,
            `-1`
        ))
        it('should work (instance, --)', TestCheddarFrom.Code(
            `print Rational.of(-8, 5).cmp([-8, 5])`,
            `0`
        ))
        it('should work (static, ++)', TestCheddarFrom.Code(
            `print Rational.cmp([9, 7], [9, 7])`,
            `0`
        ))
        it('should work (static, +-)', TestCheddarFrom.Code(
            `print Rational.cmp([9, 7], [-8, 5])`,
            `1`
        ))
        it('should work (static, -+)', TestCheddarFrom.Code(
            `print Rational.cmp([-8, 5], [9, 7])`,
            `-1`
        ))
        it('should work (static, --)', TestCheddarFrom.Code(
            `print Rational.cmp([-8, 5], [-8, 5])`,
            `0`
        ))
    });

    describe('sgn', function(){
        it('should work (instance, +)', TestCheddarFrom.Code(
            `print Rational.of(9, 7).sgn()`,
            `1`
        ))
        it('should work (instance, -)', TestCheddarFrom.Code(
            `print Rational.of(-8, 5).sgn()`,
            `-1`
        ))
        it('should work (instance, 0)', TestCheddarFrom.Code(
            `print Rational.of(-0, 13).sgn()`,
            `0`
        ))
        it('should work (static, +)', TestCheddarFrom.Code(
            `print Rational.sgn([9, 7])`,
            `1`
        ))
        it('should work (static, -)', TestCheddarFrom.Code(
            `print Rational.sgn([-8, 5])`,
            `-1`
        ))
        it('should work (static, 0)', TestCheddarFrom.Code(
            `print Rational.sgn([-0, 13])`,
            `0`
        ))
    });

    describe('rsqrt', function(){
        it('should work (instance, +)', TestCheddarFrom.Code(
            `print Rational.of(9, 7).rsqrt() - sqrt(9 / 7)`,
            `0`
        ))
        it('should work (instance, -)', TestCheddarFrom.Code(
            `print Rational.of(-8, 5).rsqrt()`,
            `NaN`
        ))
        it('should work (static, +)', TestCheddarFrom.Code(
            `print Rational.rsqrt([9, 7]) - sqrt(9 / 7)`,
            `0`
        ))
        it('should work (static, -)', TestCheddarFrom.Code(
            `print Rational.rsqrt([-8, 5])`,
            `NaN`
        ))
    });

    describe('rcbrt', function(){
        it('should work (instance, +)', TestCheddarFrom.Code(
            `print Rational.of(9, 7).rcbrt() - cbrt(9 / 7)`,
            `0`
        ))
        it('should work (instance, -)', TestCheddarFrom.Code(
            `print Rational.of(-8, 5).rcbrt()`,
            `NaN`
        ))
        it('should work (static, +)', TestCheddarFrom.Code(
            `print Rational.rcbrt([9, 7]) - cbrt(9 / 7)`,
            `0`
        ))
        it('should work (static, -)', TestCheddarFrom.Code(
            `print Rational.rcbrt([-8, 5])`,
            `NaN`
        ))
    });

    describe('rroot', function(){
        it('should work (instance, ++)', TestCheddarFrom.Code(
            `print Rational.of(9, 7).rroot([9, 7]) - (9 / 7) root (9 / 7)`,
            `0`
        ))
        it('should work (instance, +-)', TestCheddarFrom.Code(
            `print Rational.of(9, 7).rroot([-8, 5]) - (9 / 7) root (-8 / 5)`,
            `0`
        ))
        it('should work (instance, -+)', TestCheddarFrom.Code(
            `print Rational.of(-8, 5).rroot([9, 7])`,
            `NaN`
        ))
        it('should work (instance, --)', TestCheddarFrom.Code(
            `print Rational.of(-8, 5).rroot([-8, 5])`,
            `NaN`
        ))
        it('should work (static, ++)', TestCheddarFrom.Code(
            `print Rational.rroot([9, 7], [9, 7]) - (9 / 7) root (9 / 7)`,
            `0`
        ))
        it('should work (static, +-)', TestCheddarFrom.Code(
            `print Rational.rroot([9, 7], [-8, 5]) - (9 / 7) root (-8 / 5)`,
            `0`
        ))
        it('should work (static, -+)', TestCheddarFrom.Code(
            `print Rational.rroot([-8, 5], [9, 7])`,
            `NaN`
        ))
        it('should work (static, --)', TestCheddarFrom.Code(
            `print Rational.rroot([-8, 5], [-8, 5])`,
            `NaN`
        ))
    });

    describe('ln', function(){
        // internal precision errors with numeric log cause problems
        it('should work (instance, +)', TestCheddarFrom.Code(
            `print Rational.of(9, 7).ln()`,
            `0.25131442828090633`
        ))
        it('should work (instance, -)', TestCheddarFrom.Code(
            `print Rational.of(-8, 5).ln()`,
            `NaN`
        ))
        it('should work (static, +)', TestCheddarFrom.Code(
            `print Rational.ln([9, 7])`,
            `0.25131442828090633`
        ))
        it('should work (static, -)', TestCheddarFrom.Code(
            `print Rational.ln([-8, 5])`,
            `NaN`
        ))
    });

    describe('rlog', function(){
        // internal precision errors with numeric log cause problems
        it('should work (instance)', TestCheddarFrom.Code(
            `print Rational.of(9, 7).rlog([8, 5])`,
            `0.5347074206303836`
        ))
        it('should work (static)', TestCheddarFrom.Code(
            `print Rational.rlog([9, 7], [8, 5])`,
            `0.5347074206303836`
        ))
    });

    describe('rceil', function(){
        it('should work (instance, +)', TestCheddarFrom.Code(
            `print Rational.of(9, 7).rceil()`,
            `2`
        ))
        it('should work (instance, -)', TestCheddarFrom.Code(
            `print Rational.of(-8, 5).rceil()`,
            `-1`
        ))
        it('should work (static, +)', TestCheddarFrom.Code(
            `print Rational.rceil([9, 7])`,
            `2`
        ))
        it('should work (static, -)', TestCheddarFrom.Code(
            `print Rational.rceil([-8, 5])`,
            `-1`
        ))
    });

    describe('rfloor', function(){
        it('should work (instance, +)', TestCheddarFrom.Code(
            `print Rational.of(9, 7).rfloor()`,
            `1`
        ))
        it('should work (instance, -)', TestCheddarFrom.Code(
            `print Rational.of(-8, 5).rfloor()`,
            `-2`
        ))
        it('should work (static, +)', TestCheddarFrom.Code(
            `print Rational.rfloor([9, 7])`,
            `1`
        ))
        it('should work (static, -)', TestCheddarFrom.Code(
            `print Rational.rfloor([-8, 5])`,
            `-2`
        ))
    });

    describe('rround', function(){
        it('should work (instance, +)', TestCheddarFrom.Code(
            `print Rational.of(9, 7).rround()`,
            `1`
        ))
        it('should work (instance, -)', TestCheddarFrom.Code(
            `print Rational.of(-8, 5).rround()`,
            `-2`
        ))
        it('should work (static, +)', TestCheddarFrom.Code(
            `print Rational.rround([9, 7])`,
            `1`
        ))
        it('should work (static, -)', TestCheddarFrom.Code(
            `print Rational.rround([-8, 5])`,
            `-2`
        ))
    });

    describe('rabs', function(){
        it('should work (instance, +)', TestCheddarFrom.Code(
            `print Rational.of(9, 7).rabs()`,
            `9 / 7`
        ))
        it('should work (instance, -)', TestCheddarFrom.Code(
            `print Rational.of(-8, 5).rabs()`,
            `8 / 5`
        ))
        it('should work (instance, 0)', TestCheddarFrom.Code(
            `print Rational.of(-0, 13).rabs()`,
            `0 / 1`
        ))
        it('should work (static, +)', TestCheddarFrom.Code(
            `print Rational.rabs([9, 7])`,
            `9 / 7`
        ))
        it('should work (static, -)', TestCheddarFrom.Code(
            `print Rational.rabs([-8, 5])`,
            `8 / 5`
        ))
        it('should work (static, 0)', TestCheddarFrom.Code(
            `print Rational.rabs([-0, 13])`,
            `0 / 1`
        ))
    });
});
