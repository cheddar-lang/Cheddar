var TestCheddarFrom = require('../globals').TestCheddarFrom;
var chai = require('chai');
var expect = chai.expect;
chai.should();

describe('Functionized Properties', function(){
    describe('literals', function(){
        it('should work', TestCheddarFrom.Code(
            '@.len',
            ''
        ))

        it('should not error', TestCheddarFrom.Code(
            `print (@.len)("foo")`,
            '3'
        ))
    })
});