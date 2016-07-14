var TestCheddarFrom = require('../../globals').TestCheddarFrom;
var chai = require('chai');
var expect = chai.expect;
chai.should();

describe('Numbers', function(){
    describe('addition', function(){
        it('should work', TestCheddarFrom.Code(
            'print "2+3=" + String::(2+3)',
            '2+3=5'
        ))
//        it('should break', TestCheddarFrom.Code(
//            'print String::(+)'
//        ))
    })

    describe('subtraction', function(){
        describe('negative number', function(){
            it('should work', TestCheddarFrom.Code(
                'print "-3=" + String::(-3)',
                '-3=-3'
            ))
        })
        it('should work', TestCheddarFrom.Code(
            'print "5-3=" + String::(5-3)',
            '5-3=2'
        ))
//        it('should break', TestCheddarFrom.Code(
//            'print String::(-)'
//        ))
    })
    describe('multiplication', function(){
        it('should work', TestCheddarFrom.Code(
            'print "3*3=" + String::(3*3)',
            '3*3=9'
        ))
    })
    describe('repetition', function(){
        it('should work', TestCheddarFrom.Code(
            'print \'3*"foo"=\' + 3*"foo"',
            '3*"foo"=foofoofoo'
        ))
    })
    describe('division', function(){
        it('should work', TestCheddarFrom.Code(
            'print "10/5=" + String::(10/5)',
            '10/5=2'
        ))
//        it('should break', TestCheddarFrom.Code(
//            'print String::(/)'
//        ))
    })
    describe('powers', function(){
        it('should work', TestCheddarFrom.Code(
            'print "2^2=" + String::(2^2)',
            '2^2=4'
        ))
//        it('should break', TestCheddarFrom.Code(
//            'print String::(^)'
//        ))
    })
    describe('modulo', function(){
        it('should work', TestCheddarFrom.Code(
            'print "10%100=" + String::(10%100)',
            '10%100=10'
        ))
//        it('should break', TestCheddarFrom.Code(
//            'print String::(%)'
//        ))
    })
    describe('less than', function(){
        it('should work', TestCheddarFrom.Code(
            'print "5>4=" + String::(5>4)',
            '5>4=true'
        ))
//        it('should break', TestCheddarFrom.Code(
//            'print String::(>)'
//        ))
    })
    describe('more than', function(){
        it('should work', TestCheddarFrom.Code(
            'print "5<4=" + String::(5<4)',
            '5<4=false'
        ))
//        it('should break', TestCheddarFrom.Code(
//            'print String::(<)'
//        ))
    })
    describe('equal to', function(){
        it('should work', TestCheddarFrom.Code(
            'print "4==4=" + String::(4==4)',
            '4==4=true'
        ))
//        it('should break', TestCheddarFrom.Code(
//            'print String::(==)'
//        ))
    })
    describe('not equal to', function(){
        it('should work', TestCheddarFrom.Code(
            'print "4!=4=" + String::(4!=4)',
            '4!=4=false'
        ))
//        it('should break', TestCheddarFrom.Code(
//            'print String::(!=)'
//        ))
    })
    describe('less than or equal to', function(){
        it('should work', TestCheddarFrom.Code(
            'print "4>=4=" + String::(4>=4)',
            '4>=4=true'
        ))
//        it('should break', TestCheddarFrom.Code(
//            'print String::(>=)'
//        ))
    })
    describe('more than or equal to', function(){
        it('should work', TestCheddarFrom.Code(
            'print "4<=4=" + String::(4<=4)',
            '4<=4=true'
        ))
//        it('should break', TestCheddarFrom.Code(
//            'print String::(<=)'
//        ))
    })
    describe('bitwise and', function(){
        it('should work', TestCheddarFrom.Code(
            'print "4&4=" + String::(4 & 4)',
            '4&4=' + (4 & 4)
        ))
//        it('should break', TestCheddarFrom.Code(
//            'print String::(&)'
//        ))
    })
    describe('bitwise or', function(){
        it('should work', TestCheddarFrom.Code(
            'print "4|4=" + String::(4 | 4)',
            '4|4=' + (4 | 4)
        ))
//        it('should break', TestCheddarFrom.Code(
//            'print String::(|)'
//        ))
    })

    describe('xor', function(){
        it('should work', TestCheddarFrom.Code(
            'print "4 xor 3=" + String::(4 xor 3)',
            '4 xor 3=' + (4 ^ 3)
        ))
//        it('should break', TestCheddarFrom.Code(
//            'print String::(|)'
//        ))
    })

    describe('right shift', function(){
        it('should work', TestCheddarFrom.Code(
            'print "4>>3=" + String::(4>>3)',
            '4>>3=' + (4 >> 3)
        ))
//        it('should break', TestCheddarFrom.Code(
//            'print String::(|)'
//        ))
    })

    describe('left shift', function(){
        it('should work', TestCheddarFrom.Code(
            'print "4<<3=" + String::(4<<3)',
            '4<<3=' + (4<<3)
        ))
//        it('should break', TestCheddarFrom.Code(
//            'print String::(|)'
//        ))
    })

    describe('sign', function(){
        it('unary should work', TestCheddarFrom.Code(
            'print "sign 3=" + String::(sign 3)',
            'sign 3=' + Math.sign(3)
        ))

        it('binary should work', TestCheddarFrom.Code(
            'print "1 sign 3=" + String::(1 sign 3)',
            '1 sign 3=-1'
        ))
//        it('should break', TestCheddarFrom.Code(
//            'print String::(sign)'
//        ))
    })
    describe('square root', function(){
        it('should work', TestCheddarFrom.Code(
            'print "sqrt 9=" + String::(sqrt 9)',
            'sqrt 9=' + Math.sqrt(9)
        ))
//        it('should break', TestCheddarFrom.Code(
//            'print String::(sqrt)'
//        ))
    })
    describe('cube root', function(){
        it('should work', TestCheddarFrom.Code(
            'print "cbrt 8=" + String::(cbrt 8)',
            'cbrt 8=' + Math.cbrt(8)
        ))
//        it('should break', TestCheddarFrom.Code(
//            'print String::(cbrt)'
//        ))
    })
    describe('n root', function(){
        it('should work', TestCheddarFrom.Code(
            'print "8 root 3=" + String::(8 root 3)',
            '8 root 3=2'
        ))
//        it('should break', TestCheddarFrom.Code(
//            'print String::(root)'
//        ))
    })

    describe('log', function(){
        it('unary should work', TestCheddarFrom.Code(
            'print "log Math.E=" + String::(log Math.E)',
            'log Math.E=1'
        ))

        it('binary should work', TestCheddarFrom.Code(
            'print "16 log 2=" + String::(16 log 2)',
            '16 log 2=4'
        ))
    })

    describe('ceil', function(){
        it('should work', TestCheddarFrom.Code(
            'print "ceil 1.6=" + String::(ceil 1.6)',
            'ceil 1.6=2'
        ))
//        it('should break', TestCheddarFrom.Code(
//            'print String::(ceil)'
//        ))
    })
    describe('floor', function(){
        it('should work', TestCheddarFrom.Code(
            'print "floor 1.2=" + String::(floor 1.2)',
            'floor 1.2=1'
        ))
//        it('should break', TestCheddarFrom.Code(
//            'print String::(floor)'
//        ))
    })
    describe('round', function(){
        it('should work', TestCheddarFrom.Code(
            'print "round 1.2=" + String::(round 1.2)',
            'round 1.2=1'
        ))
//        it('should break', TestCheddarFrom.Code(
//            'print String::(round)'
//        ))
    })

    describe('abs', function(){
        it('should work', TestCheddarFrom.Code(
            'print "abs -1=" + String::(abs -1)',
            'abs -1=1'
        ))
    })

    describe('range', function(){
        it('should work', TestCheddarFrom.Code(
            'print "1|>5=" + String::(1|>5)',
            '1|>5=[1, 2, 3, 4, 5]'
        ))

        it('should work reversed', TestCheddarFrom.Code(
            'print "5|>1=" + String::(5|>1)',
            '5|>1=[5, 4, 3, 2, 1]'
        ))
    })

    describe('char', function(){
        it('should work', TestCheddarFrom.Code(
            'print \'@"65=\' + @" 65',
            '@"65=A'
        ))
    })
});
