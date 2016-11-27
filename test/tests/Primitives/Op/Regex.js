var TestCheddarFrom = require('../../globals').TestCheddarFrom;
var chai = require('chai');
var expect = chai.expect;
chai.should();

describe('Regex', function() {
    describe('String::', function() {
        it('should work', TestCheddarFrom.Code(
            'print String::/.+/',
            '/.+/'
        ))

        it('should work with transpiled items', TestCheddarFrom.Code(
            'print String::/(?<a>b)/',
            '/(?<a>b)/'
        ))

        it('should work with flags', TestCheddarFrom.Code(
            'print String::/(?<a>b)/gi',
            '/(?<a>b)/gi'
        ))
    })

    describe('|', function() {
        it('should work', TestCheddarFrom.Code(
            'print String::( /a/ | /b/ )',
            '/a|b/'
        ))
    })

    describe('+', function() {
        it('should work', TestCheddarFrom.Code(
            'print String::( /a/ + /b/ )',
            '/ab/'
        ))
    })

    describe('-', function() {
        it('should work', TestCheddarFrom.Code(
            'print String::( /a/ - /b/ )',
            '/(?!b)(?:a)/'
        ))
    })

    describe('*', function() {
        it('should work', TestCheddarFrom.Code(
            'print String::( /a/ * 3 )',
            '/(?:a){3}/'
        ))
    })
});
