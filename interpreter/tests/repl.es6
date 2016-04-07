import readline from 'readline';

import CheddarExpressionToken from '../../tokenizer/parsers/expr';
import CheddarShuntingYard from '../../tokenizer/tok/shunting_yard';
import CheddarLexer from '../../tokenizer/tok/lex';

let REPL = readline.createInterface(process.stdin, process.stdout);
REPL.setPrompt('cheddar> ');
REPL.prompt();

REPL.on('line', function(STDIN) {

    if (STDIN === "exit()") REPL.close();
    if (STDIN.indexOf("**EVALJS**")) {
        console.log(eval(STDIN.slice("**EVALJS**".length)));
    }

    let Exec = new CheddarExpressionToken(STDIN, 0).exec();
    if (!(Exec instanceof CheddarLexer)) {
        console.log("Syntax Error: " + Exec);
    } else {
        let shunt = new CheddarShuntingYard().exec(Exec);
        if (!(shunt instanceof CheddarLexer)) {
            console.log("Stack Error: " + shunt);
        } else {
            let stack = [];
            shunt._Tokens.forEach(item => {
                if (item.constructor.name === "CheddarNumberToken") {
                    stack.push(+item._Tokens[2]);
                } else if (item.constructor.name === "CheddarStringToken") {
                    stack.push(item._Tokens[0]);
                } else if (item.constructor.name === "CheddarOperatorToken") {
                    switch (item._Tokens[0]) {
                        case '+':
                            stack.push(stack.pop() + stack.pop()); break;
                        case '-':
                            stack.push(stack.splice(-2,1) - stack.pop()); break;
                        case '*':
                            stack.push(stack.pop() * stack.pop()); break;
                        case '/':
                            stack.push(stack.splice(-2,1) / stack.pop()); break;
                        case '%':
                            stack.push(stack.splice(-2,1) % stack.pop()); break;
                        default:
                            console.log(`Runtime Error: The operator "${item._Tokens[0]}" has no defined behavior.`);
                    }
                } else {
                    console.log("Runtime Error: An unhandled type was found: " + item.constructor.name);
                }
            });
            console.log(stack);
        }
    }

    REPL.prompt();


}).on('close', () => process.exit(0));