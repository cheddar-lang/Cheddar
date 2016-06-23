import { TestCheddarFrom } from '../../globals';
var chai = require('chai');
var expect = chai.expect;
chai.should();

describe('Numbers', () => {
    describe('concatenation', () => {
        it('should work', TestCheddarFrom.Code(
            `print "a" + "b"`,
            'ab'
        ))
    })
    
    describe('repetition', () => {
        it('should work', TestCheddarFrom.Code(
            `print "foo" * 3`,
            'foofoofoo'
        ))
    })
    
    describe('repetition', () => {
        it('should work', TestCheddarFrom.Code(
            `print "foo" * 3`,
            'foofoofoo'
        ))
    })
    
    describe('char', () => {
        it('should work', TestCheddarFrom.Code(
            `print @" "foo"`,
            '[102, 111, 111]'
        ))
    })
});