var TestCheddarFrom = require('../globals').TestCheddarFrom;
var chai = require('chai');
chai.should();

describe('Casts', function() {
    describe('String', function() {
        describe('Number', function() {
            it('should not error', TestCheddarFrom.Code(
                `String::123`,
                ''
            ))
        })

        describe('Array', function() {
            it('should not error', TestCheddarFrom.Code(
                `String::[1, 2, 3]`,
                ''
            ))
        })
    })

    describe('Number', function() {
        describe('String', function() {
            it('should not error', TestCheddarFrom.Code(
                `Number::"123"`,
                ''
            ))
        })

        describe('Boolean', function() {
            it('true should not error', TestCheddarFrom.Code(
                `Number::true`,
                ''
            ))

            it('false should not error', TestCheddarFrom.Code(
                `Number::false`,
                ''
            ))
        })
    })
});