import { TestCheddarFrom } from '../../globals';
var chai = require('chai');
var expect = chai.expect;
chai.should();

describe('Numbers', () => {
    describe('addition', () => {
        it('should work', TestCheddarFrom.Code(
            `print "2+3=" + String::(2+3)`,
            '2+3=5'
        ))
//        it('should break', TestCheddarFrom.Code(
//            `print String::(+)`
//        ))
    })

    describe('subtraction', () => {
        describe('negative number', () => {
            it('should work', TestCheddarFrom.Code(
                `print "-3=" + String::(-3)`,
                '-3=-3'
            ))
        })
        it('should work', TestCheddarFrom.Code(
            `print "5-3=" + String::(5-3)`,
            '5-3=2'
        ))
//        it('should break', TestCheddarFrom.Code(
//            `print String::(-)`
//        ))
    })
    describe('multiplication', () => {
        it('should work', TestCheddarFrom.Code(
            `print "3*3=" + String::(3*3)`,
            '3*3=9'
        ))
//        it('should break', TestCheddarFrom.Code(
//            `print String::(*)`
//        ))
    })
    describe('division', () => {
        it('should work', TestCheddarFrom.Code(
            `print "10/5=" + String::(10/5)`,
            '10/5=2'
        ))
//        it('should break', TestCheddarFrom.Code(
//            `print String::(/)`
//        ))
    })
    describe('powers', () => {
        it('should work', TestCheddarFrom.Code(
            `print "2^2=" + String::(2^2)`,
            '2^2=4'
        ))
//        it('should break', TestCheddarFrom.Code(
//            `print String::(^)`
//        ))
    })
    describe('modulo', () => {
        it('should work', TestCheddarFrom.Code(
            `print "10%100=" + String::(10%100)`,
            '10%100=10'
        ))
//        it('should break', TestCheddarFrom.Code(
//            `print String::(%)`
//        ))
    })
    describe('less than', () => {
        it('should work', TestCheddarFrom.Code(
            `print "5>4=" + String::(5>4)`,
            '5>4=true'
        ))
//        it('should break', TestCheddarFrom.Code(
//            `print String::(>)`
//        ))
    })
    describe('more than', () => {
        it('should work', TestCheddarFrom.Code(
            `print "5<4=" + String::(5<4)`,
            '5<4=false'
        ))
//        it('should break', TestCheddarFrom.Code(
//            `print String::(<)`
//        ))
    })
    describe('equal to', () => {
        it('should work', TestCheddarFrom.Code(
            `print "4==4=" + String::(4==4)`,
            '4==4=true'
        ))
//        it('should break', TestCheddarFrom.Code(
//            `print String::(==)`
//        ))
    })
    describe('not equal to', () => {
        it('should work', TestCheddarFrom.Code(
            `print "4!=4=" + String::(4!=4)`,
            '4!=4=false'
        ))
//        it('should break', TestCheddarFrom.Code(
//            `print String::(!=)`
//        ))
    })
    describe('less than or equal to', () => {
        it('should work', TestCheddarFrom.Code(
            `print "4>=4=" + String::(4>=4)`,
            '4>=4=true'
        ))
//        it('should break', TestCheddarFrom.Code(
//            `print String::(>=)`
//        ))
    })
    describe('more than or equal to', () => {
        it('should work', TestCheddarFrom.Code(
            `print "4<=4=" + String::(4<=4)`,
            '4<=4=true'
        ))
//        it('should break', TestCheddarFrom.Code(
//            `print String::(<=)`
//        ))
    })
    describe('bitwise and', () => {
        it('should work', TestCheddarFrom.Code(
            `print "4&4=" + String::(4 & 4)`,
            `4&4=${4 & 4}`
        ))
//        it('should break', TestCheddarFrom.Code(
//            `print String::(&)`
//        ))
    })
    describe('bitwise or', () => {
        it('should work', TestCheddarFrom.Code(
            `print "4|4=" + String::(4 | 4)`,
            `4|4=${4 | 4}`
        ))
//        it('should break', TestCheddarFrom.Code(
//            `print String::(|)`
//        ))
    })
    describe('sign', () => {
        it('should work', TestCheddarFrom.Code(
            `print "sign 3=" + String::(sign 3)`,
            `sign 3=${Math.sign(3)}`
        ))
//        it('should break', TestCheddarFrom.Code(
//            `print String::(sign)`
//        ))
    })
    describe('square root', () => {
        it('should work', TestCheddarFrom.Code(
            `print "sqrt 9=" + String::(sqrt 9)`,
            `sqrt 9=${Math.sqrt(9)}`
        ))
//        it('should break', TestCheddarFrom.Code(
//            `print String::(sqrt)`
//        ))
    })
    describe('cube root', () => {
        it('should work', TestCheddarFrom.Code(
            `print "cbrt 8=" + String::(cbrt 8)`,
            `cbrt 8=${Math.cbrt(8)}`
        ))
//        it('should break', TestCheddarFrom.Code(
//            `print String::(cbrt)`
//        ))
    })
    describe('n root', () => {
        it('should work', TestCheddarFrom.Code(
            `print "8 root 3=" + String::(8 root 3)`,
            `8 root 3=2`
        ))
//        it('should break', TestCheddarFrom.Code(
//            `print String::(root)`
//        ))
    })
    describe('ceil', () => {
        it('should work', TestCheddarFrom.Code(
            `print "ceil 1.6=" + String::(ceil 1.6)`,
            `ceil 1.6=2`
        ))
//        it('should break', TestCheddarFrom.Code(
//            `print String::(ceil)`
//        ))
    })
    describe('floor', () => {
        it('should work', TestCheddarFrom.Code(
            `print "floor 1.2=" + String::(floor 1.2)`,
            `floor 1.2=1`
        ))
//        it('should break', TestCheddarFrom.Code(
//            `print String::(floor)`
//        ))
    })
    describe('round', () => {
        it('should work', TestCheddarFrom.Code(
            `print "round 1.2=" + String::(round 1.2)`,
            `round 1.2=1`
        ))
//        it('should break', TestCheddarFrom.Code(
//            `print String::(round)`
//        ))
    })
    describe('abs', () => {
        it('should work', TestCheddarFrom.Code(
            `print "abs -1=" + String::(abs -1)`,
            `abs -1=1`
        ))
//        it('should break', TestCheddarFrom.Code(
//            `print String::(abs)`
//        ))
    })
    // range is borked
    // describe('range', () => {
    //     it('should work', TestCheddarFrom.Code(
    //         `print "2:4=" + String::(2:4)`,
    //         '2:4='
    //     ))
    // })
});
