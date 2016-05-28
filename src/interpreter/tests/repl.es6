import readline from 'readline';
import colors from 'colors';

import CheddarScope from '../core/env/scope';

import CheddarString from '../core/primitives/String';
import NIL from '../core/consts/nil';

import cheddar from '../exec';
import tokenizer from '../../tokenizer/tok';

let REPL = readline.createInterface(process.stdin, process.stdout);
REPL.setPrompt('Cheddar:T_REPL> '.yellow.bold);
REPL.prompt();

const REPL_ERROR = "T_REPL:ERROR".red.underline.bold + " - ".dim;

let USI = 0;

// Workaround
REPL._setPrompt = REPL.setPrompt;
REPL.setPrompt = (prompt, length) =>
    REPL._setPrompt(prompt, length ? length : prompt.split(/[\r\n]/).pop().stripColors.length);


let GLOBAL_SCOPE = new CheddarScope();

REPL.on('line', function(STDIN) {

    if (STDIN === 'quit') REPL.close();

    let Tokenizer = new tokenizer(STDIN, 0);
    let Result = Tokenizer.exec();

    let Executor = new cheddar(Result, GLOBAL_SCOPE);
    let Output = Executor.exec();

    if (Output) {

		if (typeof Implicit === "string") {
			REPL_ERROR(Output);
		} else if (Output instanceof NIL) {
			// do nothing?
		} else if (Output instanceof CheddarString) {
			console.log(`"${Output.value}"`.magenta);
		} else if (Output && Output.constructor.Cast && Output.constructor.Cast.has('String')) {
			console.log(
				`${Output.constructor.Cast.get('String')(Output).value}`.magenta
			);
		} else if (typeof Output === "symbol") {
			console.log(Output.toString().magenta);
		} else {
			console.log(`< Unprintable object of class "${Output.constructor.name.magenta}" with literal value ${Output.magenta} >`);
		}
	}

    REPL.prompt();

}).on('close', () => process.exit(0));