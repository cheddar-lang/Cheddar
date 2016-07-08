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

if (!module.parent) {
    let GLOBAL_SCOPE = new CheddarScope(null);
    GLOBAL_SCOPE.Scope = stdlib;

    process.argv.forEach((val, i) => {
        if (i > 1) {
            let v = new CheddarString(null, null);
            v.init(val);
            GLOBAL_SCOPE.Scope.set('$' + (i - 2), new CheddarVariable(v));
        }
    });

    let STDIN = "";
    let chunk;
    process.stdin.setEncoding('utf8');
    process.stdin.on('readable', () => {
        chunk = process.stdin.read();
        if (chunk !== null)
            STDIN += chunk;
    });
    process.stdin.on('end', () => {
        let Tokenizer = new tokenizer(STDIN, 0);
        let Result = Tokenizer.exec();

        if (!(Result instanceof tokenizer)) {
            DRAW_ERROR(Result, "Syntax Error");
            // Draw error pointer
            console.error(HelperCaret(STDIN, Tokenizer.Index, true));
            return;
        }

        let Executor = new cheddar(Result, GLOBAL_SCOPE);
        let Output = Executor.exec();

        if (typeof Output === "string") {
            DRAW_ERROR(Output, "Runtime Error");
        }
    });
}
else {
    module.exports = function(code, done, scope) {
        let GLOBAL_SCOPE = new CheddarScope(null);
        GLOBAL_SCOPE.Scope = new Map(stdlib);

        let Tokenizer = new tokenizer(code, 0);
        let Result = Tokenizer.exec();

        let Executor = new cheddar(Result, scope || GLOBAL_SCOPE);
        Executor.exec();

        if (done) done(Executor);
    }
}