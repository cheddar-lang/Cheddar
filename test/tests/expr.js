var TestCheddarFrom = require('./globals').TestCheddarFrom;
var chai = require('chai');
chai.should();

describe('Expressions', function(){
    /*== CASTING ==*/
    describe('casting', function(){
        it('should cast to string', TestCheddarFrom.File(
            'casting.cdr',
            '1+1=2'
        ))
    })

    /*== OPERATORS ==*/
    describe('literals', function(){
        it('should not error', TestCheddarFrom.File(
            'literals.cdr',
            ''
        ))
    })
});