#!/usr/bin/env node

const program = require('commander');
const child_process = require('child_process');
const tty = require('tty');

/*== Handle REPL Seperately ==*/
if (!process.argv[2]) {
    child_process.fork(__dirname + (tty.isatty(0) ? '/repl.js' : '/prog.js'));
}

program
    .version('0.0.1')
    .usage('[files ...] [options]')
    .option('-e, --eval [code]', 'executes code, passed inline. implicit return')
    .option('-E, --exec [code]', 'executes code, passed inline')
    .option('-f, --file [path]', 'executes file')
    .option('-i, --repl', 'Enters repl')
    .parse(process.argv);