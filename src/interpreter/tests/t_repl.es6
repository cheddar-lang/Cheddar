import readline from 'readline';
import colors from 'colors'; // MAKE SURE TO RUN `npm install colors`

// The test dependencies
import CheddarExpressionToken from '../../tokenizer/parsers/expr';
import CheddarShuntingYard from '../../tokenizer/tok/shunting_yard';

// Error dependecies
import {DESC} from '../../tokenizer/consts/err_msg';

// Helpers
import HelperLocateIndex from '../../helpers/loc';

// Setup
let REPL = readline.createInterface(process.stdin, process.stdout);
REPL.setPrompt('Cheddar:T_REPL> '.yellow.bold);
REPL.prompt();

const REPL_ERROR = text => console.log("T_REPL:ERROR".red.underline.bold + " - ".dim + text);
const REPL_HEAD  = text => console.log(`━━ ${text} ━━`.bold.magenta);

// Workaround
REPL._setPrompt = REPL.setPrompt;
REPL.setPrompt = (prompt, length) =>
	REPL._setPrompt(prompt, length ? length : prompt.split(/[\r\n]/).pop().stripColors.length);



REPL.on('line', function(STDIN) {

	if (STDIN === 'quit') REPL.close();

	let _ExprressionToken = new CheddarExpressionToken(STDIN, 0);
	let ExpressionToken = _ExprressionToken.exec();

	if (_ExprressionToken.Errored) {

		// [Line Number, Index in line]
		let [ROW, COL, INDEX] = HelperLocateIndex(STDIN, _ExprressionToken.Index);
		console.log(DESC, ExpressionToken);
		REPL_ERROR(
			(DESC.get(ExpressionToken) || "An unexpected error occured")
				.replace(/\$C/g, COL)
				.replace(/\$R/g, ROW)
				.replace(/\$1/g, STDIN[INDEX])
			 + "\n  " + STDIN.split("\n")[ROW - 1] + "\n  " + " ".repeat(COL) + "^".bold
		);

		return REPL.prompt();
	}

	let _CallStack = new CheddarShuntingYard();
	let CallStack = _CallStack.exec(ExpressionToken);

	REPL_HEAD("Execution Instruction");
	console.log(CallStack._Tokens);

	REPL.prompt();

}).on('close', () => process.exit(0));