var TestCheddarFrom = require('../globals').TestCheddarFrom;
var chai = require('chai');
var expect = chai.expect;
chai.should();

describe('Dictionary', function(){
    describe('literals', function(){
        it('should work', TestCheddarFrom.Code(
            `['a': 'b']`,
            ''
        ))

        it('should allow expressions', TestCheddarFrom.Code(
            '[ 1+1: 2 ]',
            ''
        ))
    })
});