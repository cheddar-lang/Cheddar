import readline from 'readline';
import colors from 'colors';

import CheddarScope from '../interpreter/core/env/scope';

import CheddarVariable from '../interpreter/core/env/var';
import CheddarString from '../interpreter/core/primitives/String';

import NIL from '../interpreter/core/consts/nil';

import cheddar from '../interpreter/exec';
import tokenizer from '../tokenizer/tok';

import HelperCaret from '../helpers/caret';

import stdlib from '../stdlib/stdlib';

let REPL = readline.createInterface(process.stdin, process.stdout);
let PROMPT = 'cheddar> '.yellow.bold;
REPL.setPrompt(PROMPT);
REPL.prompt();

let USI = 0;

// Workaround
REPL._setPrompt = REPL.setPrompt;
REPL.setPrompt = (prompt, length) =>
	REPL._setPrompt(prompt, length ? length : prompt.split(/[\r\n]/).pop().stripColors.length);

const REPL_ERROR = (text, type) => console.error(type.red.bold + ": ".dim + text.toString());
const REPL_HEAD = text => console.log(`━━ ${text} ━━`.bold.magenta);

const CONSTANT = {
	Writeable: false
};
let GLOBAL_SCOPE = new CheddarScope(null);
GLOBAL_SCOPE.Scope = stdlib;

let STDIN;
let resume;

REPL.on('line', function(input) {

	if (input === 'exit') REPL.close();
	if (input === 'help') {
		console.log(`
Welcome to Cheddar!

If you are using Cheddar for the first time, we reccomend following
the getting started guide at: http://cheddar.vihan.org/quickstart

The following commands are available:

   exit  - exits the REPL
   help  - outputs this
   clear - clears the screen
`)
		return REPL.prompt();
	}
	if (input === 'clear') {
		process.stdout.write('\u001B[0f');
		return REPL.prompt();
	}

	if (resume) {
		STDIN += '\n' + input;
	}
	else {
		STDIN = input;
	}

	let Tokenizer = new tokenizer(STDIN, 0);
	let Result = Tokenizer.exec();


	if (!(Result instanceof tokenizer)) {
		if (Tokenizer.Index >= STDIN.length - 1) {
			resume = true;
			REPL.setPrompt("     ... ".yellow)
			return REPL.prompt();
		}
		else {
			resume = false;
			REPL_ERROR(Result, "Syntax Error");
			// Draw error pointer
			console.error(HelperCaret(STDIN, Tokenizer.Index, true));

			REPL.setPrompt(PROMPT)
			return REPL.prompt();
		}
	}

	resume = false;
	REPL.setPrompt(PROMPT)

	let Executor = new cheddar(Result, GLOBAL_SCOPE);
	let Output = Executor.exec(process.stdout.write.bind(process.stdout));

	if (Output) {

		if (typeof Output === "string") {
			REPL_ERROR(Output, "Runtime Error");
		}
		else if (Output instanceof NIL) {
			// do nothing?
		}
		else if (!Output) {
			console.log(String(Output).red);
		}
		else if (Output && Output.constructor.Cast && (
				Output.constructor.Operator.has('repr') ||
				Output.constructor.Cast.has('String'))) {

			let txt;
			if (Output.constructor.Operator.has('repr')) {
				txt = Output.constructor.Operator.get('repr')(null, Output).value;
			}
			else {
				txt = Output.constructor.Cast.get('String')(Output).value;
			}
			console.log(txt.magenta);
		}
		else if (Output instanceof CheddarScope) {
			console.log(`< Instance of "${Output.constructor.Name}" >`.cyan);
		}
		else if (Output.prototype instanceof CheddarScope) {
			console.log(`< Class "${Output.Name}" >`.cyan);
		}
		else if (typeof Output === "symbol") {
			console.log(Output.toString().red);
		}
		else {
			console.log(`< Unprintable object of class "${Output.constructor.name.magenta}" with literal value ${Output.magenta} >`.cyan);
		}
	}

	REPL.prompt();
	process.stdin.resume();
});

const CLOSING = () => {
	console.log();
	if (resume) {
		REPL.setPrompt(PROMPT);
		resume = false;
		return REPL.prompt();
	}
	REPL.pause();
};

REPL.on('close', () => CLOSING);
REPL.on('SIGINT', CLOSING);