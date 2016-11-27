var TestCheddarFrom = require('../globals').TestCheddarFrom;
var chai = require('chai');
var expect = chai.expect;
chai.should();

describe('For', function(){
    it('should work', TestCheddarFrom.Code(
        'for (var i = 0; i < 5; i += 1) { print i }',
        '0\n1\n2\n3\n4'
    ))

    it('should work', TestCheddarFrom.Code(
        `for (i in 'foo') { print i }`,
        'f\no\no'
    ))

    it('break should work', TestCheddarFrom.Code(
        `for (var i = 0; i < 5; i += 1) {
            if (i > 2) {
                break
            };
            print i
        }`,
        '0\n1\n2'
    ))
});