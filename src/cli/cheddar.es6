#!/usr/bin/env node

const pjson = require('../../package.json');
const program = require('commander');
const child_process = require('child_process');
const tty = require('tty');
const fs = require('fs');

if (!module.parent) {
    /*== Handle REPL Seperately ==*/
    if (!process.argv[2]) {
        child_process.fork(__dirname + (tty.isatty(0) ? '/repl.js' : '/prog.js'));
    }

    if (process.argv[2] === "--update") {
        let update = child_process.exec('bash <(curl -fsSL http://cheddar.vihan.org/i/nix/cheddar)', { shell: '/bin/bash' });
        update.stdout.on('data',function(data){
            process.stdout.write(data);
        });
        update.stderr.on('data',function(data){
            process.stdout.write(data);
        });
    } else {

        program
            .version(pjson.version)
            .usage('[files ...] [options]')
            .option('-e, --eval [code]', 'executes code, passed inline. implicit return');

        if (program.update) {
            child_process.exec("bash <(curl -fsSL cheddar.vihan.org/i/nix/cheddar)");
            process.exit(0);
        }

        program.parse(process.argv);

        program.args.forEach(file => child_process.exec(`${__dirname}/prog.js < ${file}`));
    }
} else {
    module.exports = require('./prog');
}
