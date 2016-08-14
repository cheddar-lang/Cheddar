var TestCheddarFrom = require('../globals').TestCheddarFrom;
var chai = require('chai');

describe('Array.', function(){
    describe('all', function(){
        it('should work', TestCheddarFrom.Code(
            `print [1, 1, 1].all(is 1)`,
            `true`
        ))
    });

    describe('any', function(){
        it('should work', TestCheddarFrom.Code(
            `print [1, 2, 3].any(is 1)`,
            `true`
        ))
    });

    describe('any', function(){
        it('should work', TestCheddarFrom.Code(
            `print [1, 2, 3, 4].chunk(2)`,
            `[[1, 2], [3, 4]]`
        ))
    });

    describe('cycle', function(){
        it('should work', TestCheddarFrom.Code(
            `var ar = [1, 2, 3, 4]; ar.cycle(1); print ar`,
            `[4, 1, 2, 3]`
        ))
    });

    describe('each', function(){
        it('should work', TestCheddarFrom.Code(
            `[1, 2, 3, 4].each(i -> print i)`,
            `1\n2\n3\n4`
        ))
    });

    describe('filter', function(){
        it('should work', TestCheddarFrom.Code(
            `print [1, 2, 3, 4].filter(i -> i > 2)`,
            `[3, 4]`
        ))
    });

    describe('fuse', function(){
        it('should work', TestCheddarFrom.Code(
            `print [1,2].fuse`,
            `12`
        ))
    });

    describe('head', function(){
        it('should work', TestCheddarFrom.Code(
            `print [1, 2, 3, 4].head(2)`,
            `[1, 2]`
        ))
    });

    describe('index', function(){
        it('should work', TestCheddarFrom.Code(
            `print [1, 2, 3, 4].index(3)`,
            `2`
        ))
    });

    describe('join', function(){
        it('should work', TestCheddarFrom.Code(
            `print [1, 2, 3, 4].join(" ")`,
            `1 2 3 4`
        ))
    });

    describe('len', function(){
        it('should work', TestCheddarFrom.Code(
            `print [1, 2, 3, 4].len`,
            `4`
        ))
    });

    describe('map', function(){
        it('should work', TestCheddarFrom.Code(
            `print [1, 2, 3, 4].map(i -> i + 1)`,
            `[2, 3, 4, 5]`
        ))
    });

    describe('max', function(){
        it('should work', TestCheddarFrom.Code(
            `print [1, 2, 3, 4].max`,
            `4`
        ))
    });

    describe('min', function(){
        it('should work', TestCheddarFrom.Code(
            `print [1, 2, 3, 4].min`,
            `1`
        ))
    });

    describe('pop', function(){
        it('should work', TestCheddarFrom.Code(
            `print [1, 2, 3, 4].pop()`,
            `4`
        ))
    });

    describe('push', function(){
        it('should work', TestCheddarFrom.Code(
            `var ar = [1, 2, 3, 4]; ar.push(5); print ar`,
            `[1, 2, 3, 4, 5]`
        ))
    });

    describe('rand', function(){
        it('should not error', TestCheddarFrom.Code(
            `[1, 2, 3, 4].rand`,
            ``
        ))
    });

    describe('reduce', function(){
        it('should work', TestCheddarFrom.Code(
            `print [1, 2, 3, 4].reduce((*))`,
            `24`
        ))
    });

    describe('rev', function(){
        it('should work', TestCheddarFrom.Code(
            `print [1, 2, 3, 4].rev`,
            `[4, 3, 2, 1]`
        ))
    });

    describe('shift', function(){
        it('should work', TestCheddarFrom.Code(
            `print [1, 2, 3, 4].shift()`,
            `1`
        ))
    });

    describe('slice', function(){
        it('should work', TestCheddarFrom.Code(
            `print [1, 2, 3, 4].slice(1, -1)`,
            `[2, 3]`
        ))
    });

    describe('sorted', function(){
        it('should work', TestCheddarFrom.Code(
            `print [1, 3, 4, 2].sorted`,
            `[1, 2, 3, 4]`
        ))
    });

    describe('sum', function(){
        it('should work', TestCheddarFrom.Code(
            `print [1, 3, 4, 2].sum`,
            `10`
        ))
    });

    describe('tail', function(){
        it('should work', TestCheddarFrom.Code(
            `print [1, 2, 3, 4].tail(2)`,
            `[3, 4]`
        ))
    });

    describe('turn', function(){
        it('should work', TestCheddarFrom.Code(
            `print [[1, 2], [3, 4]].turn(1)`,
            `[[3, 1], [4, 2]]`
        ))
    });

    describe('turn', function(){
        it('should work', TestCheddarFrom.Code(
            `print [[1, 2], [3, 4]].turn(1)`,
            `[[3, 1], [4, 2]]`
        ))
    });

    describe('vfuse', function(){
        it('should work', TestCheddarFrom.Code(
            `print [1, 2, 3, 4].vfuse`,
            `1\n2\n3\n4`
        ))
    });
});
