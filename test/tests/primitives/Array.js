var TestCheddarFrom = require('../globals').TestCheddarFrom;
var chai = require('chai');
var expect = chai.expect;
chai.should();

describe('Array', function(){
    describe('literals', function(){
        it('should work', TestCheddarFrom.Code(
            '[1,2,3]',
            ''
        ))

        it('should allow free spacing', TestCheddarFrom.Code(
            '[ 1 , 2 , 3]',
            ''
        ))

        it('should allow trailing commas', TestCheddarFrom.Code(
            'print [ 1, ]',
            '[1]'
        ))

        it('commas should be nil', TestCheddarFrom.Code(
            'print [ 1,, 2 ]',
            '[1, nil, 2]'
        ))
    })
});