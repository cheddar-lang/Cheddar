var TestCheddarFrom = require('../globals').TestCheddarFrom;
var chai = require('chai');
chai.should();

describe('Assignment', function() {
    describe('definition', function() {
        it('should work', TestCheddarFrom.Code(
            'var a = 1',
            ''
        ))

        it('should set', TestCheddarFrom.Code(
            'var a = 1; print a',
            '1'
        ))

        it('should work in expressions', TestCheddarFrom.Code(
            'var a = 1; print a + 1',
            '2'
        ))

        it('should work with vars', TestCheddarFrom.Code(
            'var a = 1; var b = a; print b',
            '1'
        ))

        it('should work with types', TestCheddarFrom.Code(
            'var a: Number = 1; print a',
            '1'
        ))

        it('should work with implicit definition', TestCheddarFrom.Code(
            `let a := 1; a = 2`,
            ''
        ))

        it('should work with predefined to nil', TestCheddarFrom.Code(
            `let a; print a`,
            'nil'
        ))
    })

    describe('reassignment', function() {
        it('should work', TestCheddarFrom.Code(
            'var a = 1; a = 2',
            ''
        ))

        it('should set', TestCheddarFrom.Code(
            'var a = 1; a = 2; print a',
            '2'
        ))

        it('should set with a type', TestCheddarFrom.Code(
            'var a: Number = 1; a = 2; print a',
            '2'
        ))

        it('should evaluate', TestCheddarFrom.Code(
            'var a = 1; a = 2 + 2; print a',
            '4'
        ))
    })
});
