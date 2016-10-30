var TestCheddarFrom = require('../globals').TestCheddarFrom;
var chai = require('chai');

describe('Buffer', function(){
    describe('create', function(){
        it('should work', TestCheddarFrom.Code(
            `Buffer.create([0, 0, 0])`,
            ``
        ))

        it('should work with length', TestCheddarFrom.Code(
            `Buffer.create(3)`,
            ``
        ))
    });

    describe('cast', function(){
        it('should work with String', TestCheddarFrom.Code(
            `print String::Buffer.create([65, 66, 67])`,
            `ABC`
        ))

        it('should work with Array', TestCheddarFrom.Code(
            `print Array::Buffer.create([65, 66, 67])`,
            `[65, 66, 67]`
        ))
    });
});
