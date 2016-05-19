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

// Data Dependencies
import CheddarPrimitiveInterfaceDefaultScopeAliases from '../core/config/alias';

// Error dependecies
import {DESC} from '../../tokenizer/consts/err_msg';

// Helpers
import HelperLocateIndex from '../../helpers/loc';
import HelperInit from '../../helpers/init';

// Setup
let REPL = readline.createInterface(process.stdin, process.stdout);
REPL.setPrompt('Cheddar:T_REPL> '.yellow.bold);
REPL.prompt();

const REPL_ERROR = text => console.log("T_REPL:ERROR".red.underline.bold + " - ".dim + text);
const REPL_HEAD = text => console.log(`━━ ${text} ━━`.bold.magenta);

// Workaround
REPL._setPrompt = REPL.setPrompt;
REPL.setPrompt = (prompt, length) =>
	REPL._setPrompt(prompt, length ? length : prompt.split(/[\r\n]/).pop().stripColors.length);


REPL.on('line', function(STDIN) {
	console.log(CheddarString.Operator);
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

	REPL_HEAD("Execution Instruction");
	console.log(CallStack._Tokens);

	REPL_HEAD("STDOUT");
	let EvaluationEnviorment = new CheddarEval(CallStack, new CheddarScope(null, new Map([
		["pi", HelperInit(CheddarNumber, 10, 0, Math.PI)],
		["e", HelperInit(CheddarNumber, 10, 0, Math.E)],
		["phi", HelperInit(CheddarNumber, 10, 0, 1.618033988749894)],

		["Time", new CheddarScope([
			["get"]
		])],

		["alex", HelperInit(CheddarBool, false)]
	])));

	REPL_HEAD("T:eval..EXEC");
	let Implicit = EvaluationEnviorment.exec();

	REPL_HEAD("Implicit Output");
	if (Implicit) {

		if (Implicit instanceof CheddarString)
			console.log(`"${Implicit.value}"`);
		else if (Implicit.constructor.Cast.has('String'))
			console.log(
				Implicit.constructor.Cast.get('String')(Implicit).value
			);
		else if (typeof Implicit === "symbol")
			console.log(Implicit);
		else
			console.log(`Unprintable object of class "${Implicit.constructor.name}" with literal value ${Implicit}`);
	}

	REPL.prompt();

}).on('close', () => process.exit(0));