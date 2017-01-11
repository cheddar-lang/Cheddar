var TestCheddarFrom = require('../globals').TestCheddarFrom;
var chai = require('chai');

describe('Encoding', function(){
    describe('base64', function(){
        it('should work with encode', TestCheddarFrom.Code(
            `print Encoding.base64.encode("ABC")`,
            `QUJD`
        ))

        it('should work with decode', TestCheddarFrom.Code(
            `print Encoding.base64.decode("QUJD")`,
            `ABC`
        ))

        it('should work with eachother', TestCheddarFrom.Code(
            `print Encoding.base64.decode(Encoding.base64.encode("ABC"))`,
            `ABC`
        ))
    });

    describe('UTF8', function() {
        it('should decode surrogates properly', TestCheddarFrom.Code(
            `print Encoding.UTF8.decode( Buffer.create( [240, 159, 152, 128] ) ) == ( @" [ 55357, 56832 ] )`,
            `true`
        ))
    });

    /*describe('shoco', function(){
        it('should work with encode', TestCheddarFrom.Code(
            `print Array::Encoding.shoco.encode("Hello")`,
            `[72, 193, 77]`
        ))

        it('should work with decode', TestCheddarFrom.Code(
            ``,
            ``
        ))

        it('should work with eachother', TestCheddarFrom.Code(
            ``,
            ``
        ))
    });*/
});
