#!/usr/bin/env node

import CheddarScope from '../interpreter/core/env/scope';

import cheddar from '../interpreter/exec';
import tokenizer from '../tokenizer/tok';

import dep_String from '../interpreter/core/primitives/String';
import dep_Bool from '../interpreter/core/primitives/Bool';
import dep_Number from '../interpreter/core/primitives/Number';
import dep_Array from '../interpreter/core/primitives/Array';

import stdlib from '../stdlib/stdlib';

import CheddarVariable from '../interpreter/core/env/var';

const CONSTANT = { Writeable: false };
let GLOBAL_SCOPE = new CheddarScope(null, stdlib);

if (!module.parent) {
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
        let Tokenizer = new tokenizer(code, 0);
        let Result = Tokenizer.exec();
        
        let Executor = new cheddar(Result, scope || GLOBAL_SCOPE);
        Executor.exec();
        
        if (done) done(Executor);
    }
}