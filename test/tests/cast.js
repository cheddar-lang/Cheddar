var chai = require('chai');
chai.should();

var fs = require('fs');
var path = require('path');
var cheddar = require('../../dist/cli/cheddar.js');

function TestCheddar(file, result) {
    return () => {
        var c = console.log;
        var STDOUT = "";
        
        console.log = function(str) {
            STDOUT += str + '\n';
        };
        
        // cheddar() is sync 
        cheddar(
            fs.readFileSync(path.join(
                __dirname,
                '../cheddar/',
                file
            ), {
                encoding: 'utf-8'
            })
        );
        
        STDOUT.should.equal('1+1=2\n');
        
        console.log = c;
    }
}

describe('Expressions', () => {
    describe('casting', () => {
        it('should cast to string', TestCheddar(
            'casting.cdr',
            '1+1=2'
        ))
    })
});