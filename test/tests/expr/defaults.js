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
});