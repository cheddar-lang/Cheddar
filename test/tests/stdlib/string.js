var TestCheddarFrom = require('../globals').TestCheddarFrom;
var chai = require('chai');

describe('String.', function(){
    describe('length', function(){
        it('should work', TestCheddarFrom.Code(
            `print "1234".length`,
            `4`
        ))

        it('should not error', TestCheddarFrom.Code(
            `"".length`,
            ``
        ))
    });

    describe('chars', function(){
        it('should work', TestCheddarFrom.Code(
            `print "123".chars`,
            `["1", "2", "3"]`
        ))

        it('should not error', TestCheddarFrom.Code(
            `"".chars`,
            ``
        ))
    });

    describe('ord', function(){
        it('should work', TestCheddarFrom.Code(
            `print "A".ord(0)`,
            `65`
        ))

        it('unicode should work', TestCheddarFrom.Code(
            `print "\uD83D\uDE00".ord(0)`,
            `${0x1F600}`
        ))
    });

    describe('slice', function(){
        it('should work', TestCheddarFrom.Code(
            `print "12345".slice(0,3)`,
            `123`
        ))

        it('one arg should work', TestCheddarFrom.Code(
            `print "12345".slice(2)`,
            `345`
        ))
    });

    describe('split', function(){
        it('should work', TestCheddarFrom.Code(
            `print "..-....".split("-")`,
            `["..", "...."]`
        ))

        it('single match should work', TestCheddarFrom.Code(
            `print "....".split("-")`,
            `["...."]`
        ))
    });
});
