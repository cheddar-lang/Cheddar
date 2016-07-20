var TestCheddarFrom = require('../globals').TestCheddarFrom;
var chai = require('chai');

describe('cheddar', function(){
    describe('cheddar.internal', function(){
        describe('cheddar.uid', function(){
            it('should work', TestCheddarFrom.Code(
                `cheddar.uid`,
                ``
            ))
        });

        it('should allow accesss to cheddar.uid', TestCheddarFrom.Code(
            `cheddar.internal(cheddar.uid)`,
            ``
        ))
    });
});
