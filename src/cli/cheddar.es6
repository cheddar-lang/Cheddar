import CheddarScope from '../interpreter/core/env/scope';

import cheddar from '../interpreter/exec';
import tokenizer from '../tokenizer/tok';

let GLOBAL_SCOPE = new CheddarScope();


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