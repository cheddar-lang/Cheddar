var chai    = require('chai');
var cheddar = require('../../dist/cli/prog.js');
var fs      = require('fs');
var path    = require('path');

var expect = chai.expect;
chai.should();
function test(code, result) {
    return function() {
        var c = console.log;
        var STDOUT = "";
        console.log = function(str) {
            STDOUT += str + '\n';
        };
        // cheddar() is sync
        try {
            cheddar(code);
        } catch (error){
            console.log("AN ERROR OCCURRED, U DONE MESSED UP. FIX IT NOW NOW NOW NOW NOW NOW FIXED IT NOW! " + error)
            throw error;
        }

        var newLineRemovedSTDOUT = STDOUT.endsWith('\n')
            ?  STDOUT.substring(0, STDOUT.lastIndexOf('\n'))
            :  STDOUT;
        newLineRemovedSTDOUT != result ? c(
            'YOU MESSED UP! THE RESULT IS "' + newLineRemovedSTDOUT + '" AND THE DESIRED RESULT WAS "' + result + '"'
        ) : ""
        newLineRemovedSTDOUT.should.equal(result || "");
        console.log = c;
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
    TestCheddarFrom: TestCheddarFrom
};
