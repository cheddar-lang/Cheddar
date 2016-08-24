var TestCheddarFrom = require('../globals').TestCheddarFrom;
var chai = require('chai');
var expect = chai.expect;
chai.should();

describe('Function', function(){
    it('should work', TestCheddarFrom.Code(
        `func add(a: number, b: number) {
            return a + b
        }
        print add(1,2)`,
        '3'
    ))
});