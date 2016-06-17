var chai = require('chai');
chai.should();

var fs = require('fs');
var path = require('path');
var cheddar = require('../../src/cli/cheddar.es6');

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
        
        STDOUT.should.equal(result ? result + '\n' : "");
        
        console.log = c;
    }
}

describe('Expressions', () => {
    /*== CASTING ==*/
    describe('casting', () => {
        it('should cast to string', TestCheddar(
            'casting.cdr',
            '1+1=2'
        ))
    })
    
    /*== OPERATORS ==*/
    describe('literals', () => {
        it('should not error', TestCheddar(
            'literals.cdr',
            ''
        ))
    })
});