import nil from '../../../src/interpreter/core/consts/nil';
var chai = require('chai');
var expect = chai.expect;
chai.should();

describe('nil', function(){
    it('should work', function() {
        new nil().init();
        true.should.equal(true);
    })
});