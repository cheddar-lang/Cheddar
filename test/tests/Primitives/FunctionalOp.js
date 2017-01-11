var TestCheddarFrom = require('../globals').TestCheddarFrom;
var chai = require('chai');
var expect = chai.expect;
chai.should();

describe('Functionized Operators', function(){
    describe('literals', function(){
        it('should work', TestCheddarFrom.Code(
            '(+)',
            ''
        ))

        it('should not error', TestCheddarFrom.Code(
            'print (+)(1, 2)',
            '3'
        ))

        it('should work with unary ops', TestCheddarFrom.Code(
            `(:print)(3)`,
            '3'
        ))
    })
});
