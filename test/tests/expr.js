import { TestCheddarFrom } from './globals';
var chai = require('chai');
chai.should();

describe('Expressions', () => {
    /*== CASTING ==*/
    describe('casting', () => {
        it('should cast to string', TestCheddarFrom.File(
            'casting.cdr',
            '1+1=2'
        ))
    })

    /*== OPERATORS ==*/
    describe('literals', () => {
        it('should not error', TestCheddarFrom.File(
            'literals.cdr',
            ''
        ))
    })
});
