import { TestCheddarFrom } from '../globals';
var chai = require('chai');
var expect = chai.expect;
chai.should();

describe('For', () => {
    it('should work', TestCheddarFrom.Code(
        `for (var i := 0; i < 5; i = i+1) { print i }`,
        '0\n1\n2\n3\n4'
    ))
});
