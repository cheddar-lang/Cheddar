var TestCheddarFrom = require('../../globals').TestCheddarFrom;
var chai = require('chai');
var expect = chai.expect;
chai.should();

describe('Array', function() {
    describe('has', function() {
        it('should print true', TestCheddarFrom.Code(
            'print [1] has 1',
            'true'
        ))

        it('should print false', TestCheddarFrom.Code(
            'print [1] has 2',
            'false'
        ))
    })
});