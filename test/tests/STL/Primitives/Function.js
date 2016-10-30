var TestCheddarFrom = require('../../globals').TestCheddarFrom;
var chai = require('chai');

describe('Function.', function(){
    describe('&', function(){
        it('should work', TestCheddarFrom.Code(
            `print (1 & (+))(1)`,
            `2`
        ))
    });

    describe('+', function(){
        it('should work', TestCheddarFrom.Code(
            `print (((*) & 2) + ((+) & 1))(5)`,
            `12`
        ))
    });
});
