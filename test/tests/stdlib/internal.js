var TestCheddarFrom = require('../globals').TestCheddarFrom;
var chai = require('chai');

describe('cheddar.internal', function(){
    describe('require', function(){
        it('should work', TestCheddarFrom.Code(
            `cheddar.internal(cheddar.uid).require('fs')`,
            ``
        ))
    });

    describe('Auto-cast calling', function(){
        it('should work', TestCheddarFrom.Code(
            `print cheddar.internal(cheddar.uid).require('fs').readFileSync.c('test/files/file')`,
            `Hello, World!`
        ))
    });

    describe('JSON interfacing', function(){
        it('should work', TestCheddarFrom.Code(
            `print cheddar.internal(cheddar.uid).json("[1,2,3]")`,
            `1,2,3`
        ))
    });

    describe('JS Translation', function(){
        it('should work', TestCheddarFrom.Code(
            `print cheddar.internal(cheddar.uid).translate(1)`,
            `1`
        ))
    });
});
