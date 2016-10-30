var TestCheddarFrom = require('../globals').TestCheddarFrom;
var chai = require('chai');
var expect = chai.expect;
chai.should();

describe('String', function(){
    describe('literals', function(){
        it('double quotes should work', TestCheddarFrom.Code(
            'print "A"',
            'A'
        ))

        it('single quotes should work', TestCheddarFrom.Code(
            `print 'A'`,
            'A'
        ))
    })

    describe('evaluated accessors', function(){
        it('should work', TestCheddarFrom.Code(
            'print "ABC"[0]',
            'A'
        ))

        it('should work when getting negative indexes', TestCheddarFrom.Code(
            'print "ABC"[-1]',
            'C'
        ))
    })
});