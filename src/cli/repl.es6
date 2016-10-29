import readline from 'readline';
import colors from 'colors';

import CheddarScope from '../interpreter/core/env/scope';

import CheddarVariable from '../interpreter/core/env/var';
import CheddarString from '../interpreter/core/primitives/String';

import NIL from '../interpreter/core/consts/nil';

import cheddar from '../interpreter/exec';
import tokenizer from 'cheddar-parser/dist/tok';

import HelperCaret from '../helpers/caret';

import stdlib from '../stdlib/stdlib';

import package_json from '../../package.json';

let USI = 0;

try {
    let latest_version = require('child_process').spawnSync('npm', ['view', 'cheddar-lang', 'version'], { encoding: 'ascii' }).stdout.trim();

    if (latest_version.length > 0 && package_json.version.length > 0) {788
        let [latest, old] = [ latest_version.split(/[.-]/), package_json.version.split(/[.-]/) ];
        let longest_segment = latest.length > old.length ? latest : old;
        let shortest_segment = longest_segment === latest ? old : latest;

        let status = 0;

        for (let i = 0; i < shortest_segment.length; i++) {
            if (longest_segment[i]) {
                if (shortest_segment[i] < longest_segment[i]) {
                    status = -1;
                } else if (shortest_segment[i] > longest_segment[i]) {
                    status = 1;
                } else {
                    continue;
                }
            }
            break;
        }

        status = longest_segment === latest ? -status : status;

        if (status === -1) {
            console.log("Notice: ".yellow + `the installed version is ${"newer".green.bold} than the latest version`);
        } else if (status === 1) {
            console.log("Notice: ".yellow + `the installed version is ${"older".red.bold} than the latest version. Please update as soon as possible`);
        }
    }
} catch(e){}

// Workaround
let REPL = readline.createInterface(process.stdin, process.stdout);
let PROMPT = 'cheddar> '.yellow.bold;
REPL.setPrompt(PROMPT);
REPL.prompt();

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
let printed = false;

function print(text) {
	process.stdout.write(text);
	printed = true;
}

REPL.on('line', function(input) {
	printed = false;
	if (input === 'exit') {
		REPL.close();
	}
	if (input === 'help') {
		console.log(`
Welcome to Cheddar!

If you are using Cheddar for the first time, we reccomend following
the getting started guide at: http://cheddar.vihan.org/quickstart
Documentation is availale at: http://docs.cheddar.vihan.org/

The following commands are available:

   exit  - exits the REPL
   help  - outputs this
   clear - clears the screen
`);
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
		resume = false;
		REPL_ERROR(Result, "Syntax Error");
		// Draw error pointer
		console.error(HelperCaret(STDIN, Tokenizer.Index, true));

		REPL.setPrompt(PROMPT)
		return REPL.prompt();
	}

	resume = false;
	REPL.setPrompt(PROMPT)

	let Executor = new cheddar(Result, GLOBAL_SCOPE);
	let Output = Executor.exec({
		PRINT: print
	});

	if (Output) {
		if (typeof Output === "string") {
			REPL_ERROR(Output, "Runtime Error");
		}
		else if (Output instanceof NIL) {
			// do nothing?
		}
		else if (!Output) {
			console.log(String(Output).red);
		} else if (!printed) {
			if (Output && Output.Cast && (
					Output.Operator.has('repr') ||
					Output.Cast.has('String'))) {

				let txt;
				if (Output.Operator.has('repr')) {
					txt = Output.Operator.get('repr')(null, Output).value;
				}
				else {
					txt = Output.Cast.get('String')(Output).value;
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
	REPL.close();
};

REPL.on('close', CLOSING);
