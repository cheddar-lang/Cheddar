var benchmark = require('benchmark');
var colors = require('colors');
var log = "";

// Start up

var cheddar = (function(cheddar) {
    if (process.argv.indexOf('--debug') > -1) {
        return function(code) {
            return function() {
                cheddar(code, {
                    PRINT: function(value) { log += value }
                });
            }
        };
    } else {
        return function(code) {
            return function() {
                cheddar(code, {
                    PRINT: function() {}
                });
            }
        }
    }
}(require('../')));

function leftPad(string, num) {
    return string + " ".repeat(Math.max(num - string.length, 0));
}

function rightPad(string, num) {
    return " ".repeat(Math.max(num - string.length, 0)) + string;
}

function longestItem(self, key, func) {
    var nameLen = 0;
    for (var i = 0; i < self.length; i++) {
        if (func)
            nameLen = Math.max(func(self[i][key]).length, nameLen)
        else
            nameLen = Math.max(self[i][key].toString().length, nameLen);
    }
    return nameLen;
}

function prettyNum(val, pad) {
    var fast = 4500;
    var slow = 900;
    var color = 'yellow';

    if (val >= fast) color = 'green';
    if (val <= slow) color = 'red';

    return rightPad(benchmark.formatNumber(val)[color], pad);
}

function Bench(name, args) {
    if (typeof args === "string") {

    } else {
        var suite = new benchmark.Suite(name);
        for (var i = 0; i < args.length; i++) {
            suite.add(args[i][0], cheddar(args[i][1]));
        }

        suite.on('complete', function() {
            console.log(name.bold);

            var test;
            var indent = '  ';

            // Determine longest name
            var nameLen = longestItem(this, 'name');
            var hzLen = longestItem(this, 'hz', function(item) {
                return benchmark.formatNumber(item | 0);
            });
            var longestError = longestItem(this, 'stats', function(item) {
                return item.moe.toFixed(2);
            });
            var longestTime = longestItem(this, 'stats', function(item) {
                return ( item.mean * 1000 ).toFixed(2);
            });
            var longestCycles = longestItem(this, 'cycles');

            var totalLen = Math.max(longestTime, longestCycles);

            var avgSize = 7;

            for (var i = 0; i < this.length; i++) {
                test = this[i];

                var ops = test.hz | 0;
                
                console.log(
                    indent + "✓".green + " "
                    + leftPad(test.name, nameLen)
                    + " x ".dim + prettyNum(ops, hzLen).bold + " ops/sec "
                    + "± ".dim + leftPad(test.stats.moe.toFixed(2) + "%", longestError + 1 )
                );

                console.log(
                    " " + indent + indent + leftPad("Average", avgSize) + ": ".dim + leftPad((test.stats.mean * 1000).toFixed(2), totalLen) + " ms".dim + '\n' +
                    " " + indent + indent + leftPad("Cycles" , avgSize) + ": ".dim + leftPad(test.cycles, totalLen) + " total".dim
                );
            }

            console.log('');
        }).run();
    }
}

// Bench("Boot Up", "");
Bench("Literal Parsing", [
    [ "Numbers", "1" ],
    [ "String", "'foo'" ],
    [ "Symbol", "@test" ],
    [ "Array", "[1, 2, 3]" ],
]);

Bench("Prime Generation", [
    [ "Built-in", "let i = 0; for ( let a = []; a.len < 10; i += 1) { if (Math.prime(i)) { a.push(i) } }" ]
]);

process.stdout.write(log);
