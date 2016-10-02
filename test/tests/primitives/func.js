var TestCheddarFrom = require('../globals').TestCheddarFrom;
var chai = require('chai');
var expect = chai.expect;
chai.should();

describe('Functional Operators', function(){
    describe('bonding', function(){
        it('should work on LHS', TestCheddarFrom.Code(
            'print ( (+) & 1 )(1)',
            '2'
        ))

        it('should work on RHS', TestCheddarFrom.Code(
            `print ( 1 & (+) )(1)`,
            '2'
        ))
    })

    describe('map', function() {
        it('should work', TestCheddarFrom.Code(
            'print [1, 2, 3] => i -> i * 2',
            '[2, 4, 6]'
        ))
    })

    describe('reduce', function() {
        it('should work', TestCheddarFrom.Code(
            'print [1, 2, 3] / (+)',
            '6'
        ))
    })
});