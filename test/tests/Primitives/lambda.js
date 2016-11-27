var TestCheddarFrom = require('../globals').TestCheddarFrom;
var chai = require('chai');
var expect = chai.expect;
chai.should();

describe('Lambda', function(){
    describe('literals', function(){
        it('should not error', TestCheddarFrom.Code(
            '-> nil',
            ''
        ))

        it('should work with arguments', TestCheddarFrom.Code(
            `(a, b) -> a + b`,
            ''
        ))

        it('should work with typed', TestCheddarFrom.Code(
            `(a: Number, b: Number) -> a + b`,
            ''
        ))

        it('should work with nullables', TestCheddarFrom.Code(
            `(a, b?) -> a + b`,
            ''
        ))

        it('should work with defaults', TestCheddarFrom.Code(
            `(a, b = 1) -> a + b`,
            ''
        ))

        it('should work with self references', TestCheddarFrom.Code(
            `n? g -> g`,
            ''
        ))
    })

    describe('evaluation', function(){
        it('should generate scope', TestCheddarFrom.Code(
            'print (a -> a)(1)',
            '1'
        ))

        it('should dynamically assign scope', TestCheddarFrom.Code(
            'var f = n -> n < 2 ? 1 : f(n - 1) + f(n - 2); print f(10)',
            '89'
        ))

        it('should set defaults', TestCheddarFrom.Code(
            'print ((a = 1) -> a)()',
            '1'
        ))

        it('should null unpassed arguments', TestCheddarFrom.Code(
            'print ((a?) -> a)()',
            'nil'
        ))

        it('should set self references', TestCheddarFrom.Code(
            'print ( n f -> n < 2 ? 1 : f(n - 1) + f(n - 2) )(5)',
            '8'
        ))
    })
});