import readline from 'readline';
import colors from 'colors';

import CheddarScope from '../interpreter/core/env/scope';

import NIL from '../interpreter/core/consts/nil';

import cheddar from '../interpreter/exec';
import tokenizer from '../tokenizer/tok';

import HelperCaret from '../helpers/caret';

import stdlib from '../stdlib/stdlib';

let REPL = readline.createInterface(process.stdin, process.stdout);
REPL.setPrompt('cheddar> '.yellow.bold);
REPL.prompt();

let USI = 0;

// Workaround
REPL._setPrompt = REPL.setPrompt;
REPL.setPrompt = (prompt, length) =>
    REPL._setPrompt(prompt, length ? length : prompt.split(/[\r\n]/).pop().stripColors.length);

const REPL_ERROR = (text, type) => console.log(type.red.bold + ": ".dim + text.toString());
const REPL_HEAD = text => console.log(`━━ ${text} ━━`.bold.magenta);

const CONSTANT = { Writeable: false };
let GLOBAL_SCOPE = new CheddarScope(null, stdlib);

REPL.on('line', function(STDIN) {

    if (STDIN === 'exit') REPL.close();
    if (STDIN === 'help') { /* Helpful text */ }

    let Tokenizer = new tokenizer(STDIN, 0);
    let Result = Tokenizer.exec();

    if (!(Result instanceof tokenizer)) {
    	REPL_ERROR(Result, "Syntax Error");
    	// Draw error pointer
    	console.log(HelperCaret(STDIN, Tokenizer.Index, true));

    	return REPL.prompt();
    }

    let Executor = new cheddar(Result, GLOBAL_SCOPE);
    let Output = Executor.exec();

    if (Output) {

		if (typeof Output === "string") {
			REPL_ERROR(Output, "Runtime Error");
		} else if (Output instanceof NIL) {
			// do nothing?
		} else if (!Output) {
			console.log(Output);
		} else if (Output.constructor.Name === "String") {
			console.log(`"${Output.value}"`.magenta);
		} else if (Output && Output.constructor.Cast && Output.constructor.Cast.has('String')) {
			console.log(
				`${Output.constructor.Cast.get('String')(Output).value}`.magenta
			);
		} else if (Output instanceof CheddarScope) {
			console.log(`< Instance of "${Output.constructor.Name}" >`);
		} else if (Output.prototype instanceof CheddarScope) {
			console.log(`< Class "${Output.Name}" >`);
		} else if (typeof Output === "symbol") {
			console.log(Output.toString().magenta);
		} else {
			console.log(`< Unprintable object of class "${Output.constructor.name.magenta}" with literal value ${Output.magenta} >`);
		}
	}

    REPL.prompt();

})

REPL.on('close', () => process.exit(0));
REPL.on('SIGINT', () => {
  console.log();
  REPL.pause();
});