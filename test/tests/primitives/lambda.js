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
            `(a?) -> a + b`,
            ''
        ))
    })
});