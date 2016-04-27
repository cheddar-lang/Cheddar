import readline from 'readline';
import colors from 'colors'; // MAKE SURE TO RUN `npm install colors`
import Scope from '../core/env/scope';

let REPL = readline.createInterface(process.stdin, process.stdout);
REPL.setPrompt('Cheddar:PIT_REPL> '.yellow.bold);
REPL.prompt();

const REPL_ERROR = "PIT_REPL:ERROR".red.underline.bold + " - ".dim;

let USI = 0;
const GLOBAL = new Scope();
let cs = GLOBAL;

// Workaround
REPL._setPrompt = REPL.setPrompt;
REPL.setPrompt = (prompt, length) =>
    REPL._setPrompt(prompt, length ? length : prompt.split(/[\r\n]/).pop().stripColors.length);


REPL.on('line', function(STDIN) {

    if (STDIN === 'quit') REPL.close()

    let [C, A, B] = STDIN.split(" ");

    const CHECK = /([A-Za-z_$][\w$]*)\s*:=\s*(.+)/;
    if (C === 'set' || CHECK.test(STDIN)) {

        if (CHECK.test(STDIN))
            [,A, B] = STDIN.match(CHECK);

        if (B === 'scope')
            cs.manage(A, new Scope(cs, new Map([['USI', USI++]])));
        else
            cs.manage(A, B);

    } else if (C === 'get' || C === 'print') {

        console.log(cs.access(A.split(".")));

    } else if (C === 'exit' || C === "}") {

        if (cs.inheritanceChain)
            cs = cs.inheritanceChain;
        else
            console.log(REPL_ERROR + "No predecessor");

    } else if (C == 'enter') {

        const access = cs.accessor(A);
        if (access.constructor.name === "CheddarScope")
            cs = access;
        else
            console.log(REPL_ERROR + A.italic + " is not a inheritor");

    } else if (C === 'view') {
        console.log(cs.Scope);
    } else if (C ==='accessor') {
        if (cs.constructor.name === "CheddarScope")
            console.log(cs.accessor(A));
        else
            console.log(REPL_ERROR + A.italic + " is not an accessor");
    } else if (C === 'scope' || C === "{") {
        cs = new Scope(cs, new Map([['USI', USI++]]));, 
    } else {
        console.log(REPL_ERROR + "No known command");
    }

    REPL.prompt();

}).on('close', () => process.exit(0));