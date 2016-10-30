var TestCheddarFrom = require('../../globals').TestCheddarFrom;
var chai = require('chai');

describe('Number.', function(){
    describe('tobase', function(){
        it('should work', TestCheddarFrom.Code(
            `print 10.tobase(2)`,
            `1010`
        ))

        it('should work with numebr, alphabet', TestCheddarFrom.Code(
            `print 10.tobase(2, 'abc')`,
            `baba`
        ))

        it('should work with alphabet', TestCheddarFrom.Code(
            `print 10.tobase('ab')`,
            `baba`
        ))

        it('should work with alphabet, number', TestCheddarFrom.Code(
            `print 10.tobase('abc', 2)`,
            `baba`
        ))
    });
});
