import readline from 'readline';
import colors from 'colors';

import cheddar from '../eval';
import tokenizer from '../../tokenizer/tok';
//import tokenizer from '../../tokenizer/states/assign';

let REPL = readline.createInterface(process.stdin, process.stdout);
REPL.setPrompt('Cheddar:T_REPL> '.yellow.bold);
REPL.prompt();

const REPL_ERROR = "T_REPL:ERROR".red.underline.bold + " - ".dim;

let USI = 0;

// Workaround
REPL._setPrompt = REPL.setPrompt;
REPL.setPrompt = (prompt, length) =>
    REPL._setPrompt(prompt, length ? length : prompt.split(/[\r\n]/).pop().stripColors.length);


REPL.on('line', function(STDIN) {

    if (STDIN === 'quit') REPL.close();

    let Tokenizer = new tokenizer(STDIN, 0);
    let Result = Tokenizer.exec();

    console.log(Result);

    REPL.prompt();

}).on('close', () => process.exit(0));