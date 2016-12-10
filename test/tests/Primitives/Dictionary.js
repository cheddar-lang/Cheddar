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
    });

    describe('evaluated accessors', function(){
        it('should propertly access', TestCheddarFrom.Code(
            `print ['a': 'b']['a']`,
            'b'
        ))

        it('should propertly set', TestCheddarFrom.Code(
            `let d = ['a': 'b']; d['a'] = 'c'; print d['a']`,
            'c'
        ))
    });
});
