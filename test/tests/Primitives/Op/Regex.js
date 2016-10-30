var TestCheddarFrom = require('../../globals').TestCheddarFrom;
var chai = require('chai');
var expect = chai.expect;
chai.should();

describe('Regex', function() {
    describe('repr', function() {
        it('should work', TestCheddarFrom.Code(
            'print repr /.+/',
            '/.+/'
        ))

        it('should work with transpiled items', TestCheddarFrom.Code(
            'print repr /(?<a>b)/',
            '/(?<a>b)/'
        ))

        it('should work with flags', TestCheddarFrom.Code(
            'print repr /(?<a>b)/gi',
            '/(?<a>b)/gi'
        ))
    })

    describe('|', function() {
        it('should work', TestCheddarFrom.Code(
            'print repr ( /a/ | /b/ )',
            '/a|b/'
        ))
    })

    describe('+', function() {
        it('should work', TestCheddarFrom.Code(
            'print repr ( /a/ + /b/ )',
            '/ab/'
        ))
    })

    describe('-', function() {
        it('should work', TestCheddarFrom.Code(
            'print repr ( /a/ - /b/ )',
            '/(?!b)(?:a)/'
        ))
    })

    describe('*', function() {
        it('should work', TestCheddarFrom.Code(
            'print repr ( /a/ * 3 )',
            '/(?:a){3}/'
        ))
    })
});
