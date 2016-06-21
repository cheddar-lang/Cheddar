import { TestCheddarFrom } from '../globals';
var chai = require('chai');
var expect = chai.expect;
chai.should();

describe('Array', () => {
    describe('literals', () => {
        it('should work', TestCheddarFrom.Code(
            `[1,2,3]`,
            ''
        ))
        
        it('should allow free spacing', TestCheddarFrom.Code(
            `[ 1 , 2 , 3]`,
            ''
        ))
    })
});
