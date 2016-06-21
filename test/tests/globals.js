var fs = require('fs');
var path = require('path');
var chai = require('chai');
var cheddar = require('../../src/cli/cheddar.es6');
var expect = chai.expect;
chai.should();
function test(code, result) {
    return () => {
        var c = console.log;
        var e = console.error;
        var STDOUT = "";
        var STDERR = "";
        console.log = function(str) {
            STDOUT += str + '\n';
        };
        console.error = function(str) {
            STDERR += str + '\n';
        };
        // cheddar() is sync
        cheddar(code);
        if (STDERR){
            c(`OH NOES WE GOT ERRORS!! ${STDERR.replace(/\n/g, '\n - ')}`) // makes into nice little bullet points :3
        }
        var newLineRemovedSTDOUT = STDOUT.endsWith('\n') // golfed: STDOUT.replace(/\n$/,'');
            ?  STDOUT.substring(0, STDOUT.lastIndexOf('\n'))
            :  STDOUT;
        newLineRemovedSTDOUT != result ? c(`YOU MESSED UP! THE RESULT IS ${newLineRemovedSTDOUT} AND THE DESIRED RESULT WAS ${result}`) : ""
        newLineRemovedSTDOUT.should.equal(result || "");
        console.log = c;
        console.error = e;
    }
}
function readFileContents(file){
    let filePath = file.lastIndexOf('/') != -1
        ?  file.substring(0, file.lastIndexOf('/') + 1)
        :  '';
    return fs.readFileSync(path.join(
        __dirname,
        `../cheddar/${filePath}`,
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

export { TestCheddarFrom };
