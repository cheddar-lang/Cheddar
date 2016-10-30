var TestCheddarFrom = require('../../globals').TestCheddarFrom;
var chai = require('chai');

describe('String.', function(){
    describe('len', function(){
        it('should work', TestCheddarFrom.Code(
            `print "1234".len`,
            `4`
        ))

        it('should not error', TestCheddarFrom.Code(
            `"".len`,
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

    describe('bytes', function(){
        it('should work', TestCheddarFrom.Code(
            `print "123".bytes`,
            `[49, 50, 51]`
        ))
    });

    describe('bytes', function(){
        it('should work', TestCheddarFrom.Code(
            `print "123".bytes`,
            `[49, 50, 51]`
        ))
    });

    describe('count', function(){
        it('should work on len 1', TestCheddarFrom.Code(
            `print "a".count("a") == 1`,
            `true`
        ))

        it('should work with overlap', TestCheddarFrom.Code(
            `print "ababa".count("aba") == 2`,
            `true`
        ))
    });

    describe('lines', function(){
        it('should work', TestCheddarFrom.Code(
            `print "a\\nb".lines`,
            `["a", "b"]`
        ))
    });

    describe('lower', function(){
        it('should work', TestCheddarFrom.Code(
            `print "ABC".lower`,
            `abc`
        ))
    });

    describe('upper', function(){
        it('should work', TestCheddarFrom.Code(
            `print "abc".upper`,
            `ABC`
        ))
    });

    describe('rev', function(){
        it('should work', TestCheddarFrom.Code(
            `print "abc".rev`,
            `cba`
        ))
    });

    describe('chunk', function(){
        it('should work', TestCheddarFrom.Code(
            `print "1234".chunk(2)`,
            `["12", "34"]`
        ))
    });

    describe('head', function(){
        it('should work', TestCheddarFrom.Code(
            `print "1234".head(2)`,
            `12`
        ))
    });

    describe('index', function(){
        it('should work', TestCheddarFrom.Code(
            `print "1234".index('3')`,
            `2`
        ))
    });

    describe('sub', function(){
        it('should work', TestCheddarFrom.Code(
            `print "ab".sub(/b/, 'a')`,
            `aa`
        ))

        it('should work globally', TestCheddarFrom.Code(
            `print "abb".sub(/b/g, 'a')`,
            `aaa`
        ))

        it('should work with function', TestCheddarFrom.Code(
            `print "abb".sub(/b/g, -> 'a')`,
            `aaa`
        ))
    });

    describe('static items', function() {
        describe('letters', function() {
            it('should work', TestCheddarFrom.Code(
                `print String.letters`,
                `["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]`
            ))
        });
    });
});
