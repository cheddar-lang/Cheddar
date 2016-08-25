var TestCheddarFrom = require('../globals').TestCheddarFrom;
var api = require('../globals').api;
var prompt = require('../../../src/stdlib/ns/IO/prompt');
var fs = require('fs');
var chai = require('chai');

describe('IO', function() {

    describe('sprintf', function() {
        it('string should work', TestCheddarFrom.Code(
            `print IO.sprintf("Hello, World!")`,
            `Hello, World!`
        ))

        describe('specifiers', function() {
            it('%d', TestCheddarFrom.Code(
                `print IO.sprintf("1 + 1 = %d", 2)`,
                `1 + 1 = 2`
            ))

            it('%i', TestCheddarFrom.Code(
                `print IO.sprintf("1 + 1 = %i", 2)`,
                `1 + 1 = 2`
            ))

            it('%x', TestCheddarFrom.Code(
                `print IO.sprintf("1 + 1 = %x", 255)`,
                `1 + 1 = ff`
            ))

            it('%X', TestCheddarFrom.Code(
                `print IO.sprintf("1 + 1 = %X", 255)`,
                `1 + 1 = FF`
            ))

            it('%r', TestCheddarFrom.Code(
                `print IO.sprintf("[1,2,3]=%r", [1,2,3])`,
                `[1,2,3]=[1, 2, 3]`
            ))

            it('%s', TestCheddarFrom.Code(
                `print IO.sprintf("Hello, %s!", "World")`,
                `Hello, World!`
            ))
        });

        describe('width', function() {
            it('wildcard should work', TestCheddarFrom.Code(
                `print IO.sprintf("%*d", 2, 1)`,
                ` 1`
            ))

            it('digits should work', TestCheddarFrom.Code(
                `print IO.sprintf("%2d", 1)`,
                ` 1`
            ))

            it('multi-digit should work', TestCheddarFrom.Code(
                `print IO.sprintf("%10d", 123456789)`,
                ` 123456789`
            ))
        });

        describe('flag', function() {
            it('left justification should work', TestCheddarFrom.Code(
                `print IO.sprintf("%-2d", 1)`,
                `1 `
            ))

            it('force sign should work', TestCheddarFrom.Code(
                `print IO.sprintf("%+d", 1)`,
                `+1`
            ))

            it('base repr should work', TestCheddarFrom.Code(
                `print IO.sprintf("%#x", 255)`,
                `0xff`
            ))

            it('0-padding should work', TestCheddarFrom.Code(
                `print IO.sprintf("%0*d", 2, 1)`,
                `01`
            ))
        });
    });

    describe('printf', function() {
        it('should work', TestCheddarFrom.Code(
            `IO.printf("Hello, World!")`,
            `Hello, World!`
        ))
    });

    describe('read', function() {
        it('should work', TestCheddarFrom.Code(
            `print IO.read("./test/files/file")`,
            `Hello, World!`
        ))
    });

    describe('open', function() {
        it('should work', TestCheddarFrom.Code(
            `let fd = IO.open("./test/files/chr", "r");
            print String::fd.read(1);
            fd.close()`,
            `a`
        ))
    });

});
