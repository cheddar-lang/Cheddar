import { TestCheddarFrom } from '../globals';
var chai = require('chai');
chai.should();

describe('Casts', () => {
    describe('String', () => {
        describe('Number', () => {
            it('should not error', TestCheddarFrom.Code(
                `String::123`,
                ''
            ))
        })
        
        describe('Array', () => {
            it('should not error', TestCheddarFrom.Code(
                `String::[1, 2, 3]`,
                ''
            ))
        })
    })
});