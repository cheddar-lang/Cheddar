#!/usr/bin/env node

import CheddarScope from '../interpreter/core/env/scope';

import colors from 'colors';

import CheddarVariable from '../interpreter/core/env/var';
import CheddarString from '../interpreter/core/primitives/String';

import HelperCaret from '../helpers/caret';

import cheddar from '../interpreter/exec';
import tokenizer from '../tokenizer/tok';

import stdlib from '../stdlib/stdlib';

const DRAW_ERROR = (text, type) => console.error(type.red.bold + ": ".dim + text.toString());

var GLOBAL_SCOPE = new CheddarScope(null);
GLOBAL_SCOPE.Scope = stdlib;

var STDIN = process.argv[2];

var Tokenizer = new tokenizer(STDIN, 0);
var Result = Tokenizer.exec();

if (!(Result instanceof tokenizer)) {
    DRAW_ERROR(Result, "Syntax Error");
    // Draw error pointer
    console.error(HelperCaret(STDIN, Tokenizer.Index, true));
    process.exit(1);
}

var Executor = new cheddar(Result, GLOBAL_SCOPE);
var Output = Executor.exec(process.stdout.write.bind(process.stdout));

if (typeof Output === "string") {
    DRAW_ERROR(Output, "Runtime Error");
}