#!/usr/bin/env node

import CheddarScope from '../interpreter/core/env/scope';

import colors from 'colors';

import HelperCaret from '../helpers/caret';

import cheddar from '../interpreter/exec';
import tokenizer from 'cheddar-parser/dist/tok';

import stdlib from '../stdlib/stdlib';

function stripansi(text) {
    return text.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, "");
}

function error(text, data = "") {
    if (global.CHEDDAR_CLI_COLOR) {
        console.error(text + data);
    } else {
        console.error(stripansi(text) + data);
    }
}

let execcheddar = function(input, args) {
    let GLOBAL_SCOPE = new CheddarScope(null);
    GLOBAL_SCOPE.Scope = new Map(stdlib);

    let Tokenizer = new tokenizer(input, 0);
    let Result = Tokenizer.exec();

    if (!(Result instanceof tokenizer)) {
        error("Syntax Error: ".red, Result);
        // Draw error pointer
        error(HelperCaret(input, Tokenizer.Index, global.CHEDDAR_CLI_COLOR));
        return "";
    }


    let Executor = new cheddar(Result, GLOBAL_SCOPE);
    let Output = Executor.exec(args);

    if (typeof Output === "string") {
        error("Runtime Error: ".red, Output);
    }

    return Output;
};

execcheddar.stdlib = require('../stdlib/api');
module.exports = execcheddar;
