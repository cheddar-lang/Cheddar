#!/usr/bin/env node

import CheddarScope from '../interpreter/core/env/scope';

import cheddar from '../interpreter/exec';
import tokenizer from '../tokenizer/tok';

import stdlib from '../stdlib/stdlib';

if (!module.parent) {
    let GLOBAL_SCOPE = new CheddarScope(null);
    GLOBAL_SCOPE.Scope = stdlib;

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

        let Executor = new cheddar(Result, GLOBAL_SCOPE);
        Executor.exec();
    });
} else {
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