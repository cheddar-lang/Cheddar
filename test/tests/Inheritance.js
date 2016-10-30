var TestCheddarFrom = require('./globals').TestCheddarFrom;

describe('Scoping', function(){
    describe('inheritance', function(){
        it('should work', TestCheddarFrom.Code(
            `
var a = 5;
if (true) {
    print a
}`,
            '5'
        ))
    })
});
