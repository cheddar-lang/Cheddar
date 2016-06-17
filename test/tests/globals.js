var fs = require('fs');
var path = require('path');
var chai = require('chai');
chai.should();
var expect = chai.expect;
var cheddar = require('../../src/cli/cheddar.es6');
function test(code, result) {
    return () => {
        var c = console.log;
        var STDOUT = "";
        console.log = function(str) {
            STDOUT += str + '\n';
        };
        // cheddar() is sync
        cheddar(code);
        var newLineRemovedSTDOUT = STDOUT.endsWith('\n')
            ?  STDOUT.substring(0, STDOUT.lastIndexOf('\n'))
            :  STDOUT;
        newLineRemovedSTDOUT != result ? c(`YOU MESSED UP! THE RESULT IS ${newLineRemovedSTDOUT} AND THE DESIRED RESULT WAS ${result}`) : ""
        newLineRemovedSTDOUT.should.equal(result || "");
        console.log = c;
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
