var TestCheddarFrom = require('../../globals').TestCheddarFrom;
var chai = require('chai');

describe('Number.', function(){
    describe('toBase', function(){
        it('should work', TestCheddarFrom.Code(
            `print 10.toBase(2)`,
            `1010`
        ))

        it('should work with numebr, alphabet', TestCheddarFrom.Code(
            `print 10.toBase(2, 'abc')`,
            `baba`
        ))

        it('should work with alphabet', TestCheddarFrom.Code(
            `print 10.toBase('ab')`,
            `baba`
        ))

        it('should work with alphabet, number', TestCheddarFrom.Code(
            `print 10.toBase('abc', 2)`,
            `baba`
        ))
    });
});
