var TestCheddarFrom = require('../../globals').TestCheddarFrom;
var chai = require('chai');
var expect = chai.expect;
chai.should();

describe('Numbers', function() {
    describe('concatenation', function() {
        it('should work', TestCheddarFrom.Code(
            'print "a" + "b"',
            'ab'
        ))
    })

    describe('repetition', function() {
        it('should work', TestCheddarFrom.Code(
            'print "foo" * 3',
            'foofoofoo'
        ))
    })

    describe('repetition', function() {
        it('should work', TestCheddarFrom.Code(
            'print "foo" * 3',
            'foofoofoo'
        ))
    })

    describe('has', function() {
        it('should print true', TestCheddarFrom.Code(
            'print "a" has "a"',
            'true'
        ))

        it('should print false', TestCheddarFrom.Code(
            'print "a" has "b"',
            'false'
        ))
    })

    describe('char', function() {
        it('should work', TestCheddarFrom.Code(
            'print @" "foo"',
            '[102, 111, 111]'
        ))
    })
});