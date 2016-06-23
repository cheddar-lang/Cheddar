import { TestCheddarFrom } from '../globals';
var chai = require('chai');

describe('Math', () => {
    describe('E', () => {
        it('should work', TestCheddarFrom.Code(
            `print Math.E`,
            `2.718281828459045`
        ))
    });
    
    describe('PI', () => {
        it('should work', TestCheddarFrom.Code(
            `print Math.PI`,
            `3.141592653589793`
        ))
    });
    
    describe('PHI', () => {
        it('should work', TestCheddarFrom.Code(
            `print Math.PHI`,
            `1.618033988749894`
        ))
    });
    
    describe('MILL', () => {
        it('should work', TestCheddarFrom.Code(
            `print Math.MILL`,
            `1.30637788386308`
        ))
    });
    
    describe('GAMMA', () => {
        it('should work', TestCheddarFrom.Code(
            `print Math.GAMMA`,
            `0.577215664901532`
        ))
    });
    
    describe('AVOGADRO', () => {
        it('should work', TestCheddarFrom.Code(
            `print Math.AVOGADRO`,
            `6.02214086`
        ))
    });
    
    describe('fib', () => {
        it('should work', TestCheddarFrom.Code(
            `print Math.fib(10)`,
            `55`
        ))
    });
    
    describe('isprime', () => {
        it('should be false', TestCheddarFrom.Code(
            `print Math.isprime(10)`,
            `false`
        ))
        
        it('should be true', TestCheddarFrom.Code(
            `print Math.isprime(11)`,
            `true`
        ))
    });
    
    describe('nthprime', () => {
        it('should work', TestCheddarFrom.Code(
            `print Math.nthprime(5)`,
            `13`
        ))
    });
});
