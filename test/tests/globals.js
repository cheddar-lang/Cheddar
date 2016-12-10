var chai    = require('chai');
var cheddar = require('../../src/cheddar/cli/prog');
var api     = require('../../src/cheddar/stdlib/api')
var fs      = require('fs');
var path    = require('path');

var expect = chai.expect;
chai.should();
function test(code, result) {
    return function() {
        var STDOUT = "";
        // cheddar() is sync
        try {
            cheddar(code, {
                PRINT: function(text) {
                    STDOUT += text;
                }
            });
        } catch (error){
            console.log("AN ERROR OCCURRED, U DONE MESSED UP. FIX IT NOW NOW NOW NOW NOW NOW FIXED IT NOW! " + error)
            throw error;
        }

        STDOUT.replace(/\n$/, "").should.equal(result || "");
    }
}
function readFileContents(file){
    var filePath = file.lastIndexOf('/') != -1
        ?  file.substring(0, file.lastIndexOf('/') + 1)
        :  '';
    return fs.readFileSync(path.join(
        __dirname,
        '../cheddar/' + filePath,
        file.replace(filePath, '')
    ), {
        encoding: 'utf-8'
    })
}
var TestCheddarFrom = {
    Code: function(code, result) {
        return test(
            code,
            result
        );
    },
    File: function(file, result) {
        return test(
            readFileContents(file),
            result
        );
    }
}

module.exports = {
    TestCheddarFrom: TestCheddarFrom,
    api: api
};
