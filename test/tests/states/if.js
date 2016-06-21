import { TestCheddarFrom } from '../globals';
var chai = require('chai');
var expect = chai.expect;
chai.should();

describe('Ifs', () => {
    describe('if', () => {
        it('should work', TestCheddarFrom.Code(
            `if true { print "true" }`,
            'true'
        ))
        
        it('should evaluate', TestCheddarFrom.Code(
            `if 2 == 2 { print "true" }`,
            'true'
        ))
        
        it('should inherit scope', TestCheddarFrom.Code(
            `var foo := 1; if foo == 1 { print "true" }`,
            'true'
        ))
    })
    
    describe('else', () => {
        it('should work', TestCheddarFrom.Code(
            `if false { print "true" } else { print "false" }`,
            'false'
        ))
        
        it('should evaluate', TestCheddarFrom.Code(
            `if 2 != 2 { print "true" } else { print "false" }`,
            'false'
        ))
        
        it('should inherit scope', TestCheddarFrom.Code(
            `var foo := 1; if foo == 2 { print "true" } else { print "false" }`,
            'false'
        ))
        
        it('should not error', TestCheddarFrom.Code(
            `if false { print "true" }`,
            ''
        ))
    })
    
    describe('else if', () => {
        it('should work', TestCheddarFrom.Code(
            `if false { print "true" } else if true { print "else if" } else { print "false" }`,
            'else if'
        ))
        
        it('should evaluate', TestCheddarFrom.Code(
            `if 2 != 2 { print "true" } else if 1 == 1 { print "else if" } else { print "false" }`,
            'else if'
        ))
        
        it('should inherit scope', TestCheddarFrom.Code(
            `var foo := 1; if foo == 2 { print "true" } else if foo == 1 { print "else if" } else { print "false" }`,
            'else if'
        ))
        
        it('should not error', TestCheddarFrom.Code(
            `if false { print "true" } else if true { print "else if" }`,
            'else if'
        ))
    })
});
