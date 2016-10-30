var TestCheddarFrom = require('../globals').TestCheddarFrom;
var chai = require('chai');
var expect = chai.expect;
chai.should();

describe('Class', function(){
    it('should work with op overloading', TestCheddarFrom.File(
        'class.cheddar',
        `Created an animal named Max
My dog is 3 years old
My dog's name is Max
My dog's age is 3
Created an animal named Downgoat
Max
Downgoat
U CANT FUSE ANIMALS TOGETHER SILLY`
    ))
});
