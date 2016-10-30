var TestCheddarFrom = require('../globals').TestCheddarFrom;

describe('Ternary', function() {
    it('should print 1', TestCheddarFrom.Code(
        `print (true ? 1 : 0)`,
        '1'
    ))

    it('should print 0', TestCheddarFrom.Code(
        `print (false ? 1 : 0)`,
        '0'
    ))
});