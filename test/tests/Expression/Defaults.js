var TestCheddarFrom = require('../globals').TestCheddarFrom;

describe('Equality', function() {
    describe('==', function() {
        it('objects should work', TestCheddarFrom.Code(
            `print 1 == 1`,
            'true'
        ))

        it('should be false', TestCheddarFrom.Code(
            `print 1 == 2`,
            'false'
        ))
    })

    describe('!=', function() {
        it('classes should work', TestCheddarFrom.Code(
            `print String != String`,
            'false'
        ))

        it('objects should work', TestCheddarFrom.Code(
            `print 1 != 1`,
            'false'
        ))

        it('should be false', TestCheddarFrom.Code(
            `print 1 != 2`,
            'true'
        ))
    })

    describe('+', function() {
        it('should work as a no-op', TestCheddarFrom.Code(
            `print +1`,
            '1'
        ))
    })

    describe('!', function() {
        it('not 0 is false', TestCheddarFrom.Code(
            `print !1`,
            'false'
        ))

        it('0 is true', TestCheddarFrom.Code(
            `print !0`,
            'true'
        ))

        it('false is true', TestCheddarFrom.Code(
            `print !false`,
            'true'
        ))

        it('empty string is true', TestCheddarFrom.Code(
            `print !""`,
            'true'
        ))

        it('empty array is true', TestCheddarFrom.Code(
            `print ![]`,
            'true'
        ))
    })

    describe('actually is', function() {
        it('should work on same object', TestCheddarFrom.Code(
            `let a = 1;
let b = a;
print a actually is b`,
            'true'
        ))

        it('should return false on different object', TestCheddarFrom.Code(
            `let a = 1;
let b = 1;
print a actually is b`,
            'false'
        ));
    });

    describe('what is', function() {
        it('should not error', TestCheddarFrom.Code(
            `what is "love"`,
            ''
        ))
    });
});
