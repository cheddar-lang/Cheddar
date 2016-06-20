import readline from 'readline';
import colors from 'colors';

import CheddarScope from '../interpreter/core/env/scope';

import NIL from '../interpreter/core/consts/nil';

import cheddar from '../interpreter/exec';
import tokenizer from '../tokenizer/tok';

/*== ENVIORNMENT GENERATION DEPENDENCIES ==*/
// TODO Externalize this
import dep_String from '../interpreter/core/primitives/String';
import dep_Bool from '../interpreter/core/primitives/Bool';
import dep_Number from '../interpreter/core/primitives/Number';
import dep_Array from '../interpreter/core/primitives/Array';

import CheddarVariable from '../interpreter/core/env/var';

let REPL = readline.createInterface(process.stdin, process.stdout);
REPL.setPrompt('cheddar> '.yellow.bold);
REPL.prompt();

let USI = 0;

// Workaround
REPL._setPrompt = REPL.setPrompt;
REPL.setPrompt = (prompt, length) =>
    REPL._setPrompt(prompt, length ? length : prompt.split(/[\r\n]/).pop().stripColors.length);

const REPL_ERROR = (text, type) => console.log(type.red.bold + ": ".dim + text);
const REPL_HEAD = text => console.log(`━━ ${text} ━━`.bold.magenta);

const CONSTANT = { Writeable: false };
let GLOBAL_SCOPE = new CheddarScope(null, new Map([
	["String" , new CheddarVariable(dep_String, CONSTANT)],
	["Number" , new CheddarVariable(dep_Number, CONSTANT)],
	["Array"  , new CheddarVariable(dep_Array , CONSTANT)],
	["Boolean", new CheddarVariable(dep_Bool  , CONSTANT)]
]));

REPL.on('line', function(STDIN) {

    if (STDIN === 'quit') REPL.close();

    let Tokenizer = new tokenizer(STDIN, 0);
    let Result = Tokenizer.exec();

    let Executor = new cheddar(Result, GLOBAL_SCOPE);
    let Output = Executor.exec();

    if (Output) {

		if (typeof Output === "string") {
			REPL_ERROR(Output, "Error");
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

}).on('close', () => process.exit(0));