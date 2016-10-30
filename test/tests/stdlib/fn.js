var TestCheddarFrom = require('../globals').TestCheddarFrom;
var chai = require('chai');

describe("fn", function(){
    describe("reflexive", function(){
        it("should work", TestCheddarFrom.Code(
            "fn.reflexive((+))(3)",
            "6"
        ));
        it("should work", TestCheddarFrom.Code(
            "fn.reflexive((*))(3)",
            "9"
        ));
    });

    describe("hook", function(){
        it("should work", TestCheddarFrom.Code(
            "fn.hook((+),(sqrt),(-))(4)",
            "6"
        ));
    });
});
