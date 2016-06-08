#!/usr/bin/env node
const pjson = require('../../package.json');
const program = require('commander');
const child_process = require('child_process');
const tty = require('tty');
const fs = require('fs');

/*== Handle REPL Seperately ==*/
if (!process.argv[2]) {
    child_process.fork(__dirname + (tty.isatty(0) ? '/repl.js' : '/prog.js'));
}

program
    .version(pjson.version)
    .usage('[files ...] [options]')
    .option('-e, --eval [code]', 'executes code, passed inline. implicit return')
    .option('-E, --exec [code]', 'executes code, passed inline')
    .option('-f, --file [path]', 'executes file')
    .option('-i, --repl', 'Enters repl')
    .parse(process.argv);

program.args.forEach(file => child_process.exec(
    `${__dirname}/prog.js < ${file}`
));