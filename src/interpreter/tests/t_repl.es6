import readline from 'readline';
import colors from 'colors'; // MAKE SURE TO RUN `npm install colors`

// Tokenization Depedencies
import CheddarExpressionToken from '../../tokenizer/parsers/expr';
import CheddarShuntingYard from '../../tokenizer/tok/shunting_yard';

// Evaluation Dependencies
import CheddarScope from '../core/env/scope';
import CheddarEval from '../core/eval/eval';

// Preset Dependencies
import CheddarNumber from '../core/primitives/Number';
import CheddarString from '../core/primitives/String';
import CheddarBool from '../core/primitives/Bool';

import NIL from '../core/consts/nil';

// Data Dependencies
import CheddarPrimitiveAliases from '../core/config/alias';

// Error dependecies
import {DESC} from '../../tokenizer/consts/err_msg';

// Helpers
import HelperLocateIndex from '../../helpers/loc';
import HelperInit from '../../helpers/init';

// Setup
let REPL = readline.createInterface(process.stdin, process.stdout);
REPL.setPrompt('Cheddar::2> '.yellow.bold);
REPL.prompt();

const REPL_ERROR = text => console.log("T_REPL:ERROR".red.underline.bold + " - ".dim + text);
const REPL_HEAD = text => console.log(`━━ ${text} ━━`.bold.magenta);

// Workaround
REPL._setPrompt = REPL.setPrompt;
REPL.setPrompt = (prompt, length) =>
	REPL._setPrompt(prompt, length ? length : prompt.split(/[\r\n]/).pop().stripColors.length);

let Input = process.argv[3] || process.argv[2];

try {
	Input = eval(Input);
	if (typeof Input === 'string') {
		Input = [CheddarString, [Input]]
	} else if (typeof Input === 'number') {
		Input = [CheddarNumber, [10, 0, Input]];
	} else {
		Input = [NIL, []];
	}
} catch(e) {
	Input = [NIL, []];
}

let GlobalScope = new CheddarScope();

GlobalScope.make("pi", CheddarNumber, [10, 0, Math.PI]);
GlobalScope.make("e", CheddarNumber, [10, 0, Math.E]);
GlobalScope.make("phi", CheddarNumber, [10, 0, 1.618033988749894]);
GlobalScope.make("alex", CheddarBool, ["false"]);
GlobalScope.make("$0", ...Input);

REPL.on('line', function(STDIN) {
	if (STDIN === 'quit') REPL.close();

	let _ExprressionToken = new CheddarExpressionToken(STDIN, 0);
	let ExpressionToken = _ExprressionToken.exec();

	if (_ExprressionToken.Errored) {

		// [Line Number, Index in line]
		let [ROW, COL, INDEX] = HelperLocateIndex(STDIN, _ExprressionToken.Index);

		REPL_ERROR(
			(DESC.get(ExpressionToken) || "An unexpected error occured")
			.replace(/\$C/g, COL)
			.replace(/\$R/g, ROW)
			.replace(/\$1/g, STDIN[INDEX]) + "\n  " + STDIN.split("\n")[ROW - 1] + "\n  " + " ".repeat(COL) + "^".bold
		);

		return REPL.prompt();
	}

	let _CallStack = new CheddarShuntingYard();
	let CallStack = _CallStack.exec(ExpressionToken);

	//REPL_HEAD("Execution Instruction");
	//console.log(CallStack._Tokens);

	let EvaluationEnviorment = new CheddarEval(CallStack, GlobalScope);
	let Implicit = EvaluationEnviorment.exec();

	if (Implicit) {

		if (typeof Implicit === "string") {
			REPL_ERROR(Implicit);
		} else if (Implicit instanceof NIL) {
			// do nothing?
		} else if (Implicit instanceof CheddarString) {
			console.log(`"${Implicit.value}"`.magenta);
		} else if (Implicit && Implicit.constructor.Cast && Implicit.constructor.Cast.has('String')) {
			console.log(
				`${Implicit.constructor.Cast.get('String')(Implicit).value}`.magenta
			);
		} else if (typeof Implicit === "symbol") {
			console.log(Implicit.toString().magenta);
		} else {
			console.log(`< Unprintable object of class "${Implicit.constructor.name.magenta}" with literal value ${Implicit.magenta}`);
		}
	}

	REPL.prompt();

}).on('close', () => process.exit(0));