import readline from 'readline';

import CheddarExpressionToken from '../../tokenizer/parsers/expr';
import CheddarShuntingYard from '../../tokenizer/tok/shunting_yard';
import CheddarLexer from '../../tokenizer/tok/lex';

import CheddarExecutionEnvironment from '../Core/environment/exec_env';

import simplify from '../Core/simplify';
import {OPS, PREFIX_OPS} from '../Core/operators';

let REPL = readline.createInterface(process.stdin, process.stdout);
REPL.setPrompt('Cheddar> ');
REPL.prompt();

// TODO: assignment
// TODO: how is

REPL.on('line', function(STDIN) {

    if (STDIN === 'exit') REPL.close();
    if (STDIN.indexOf('**EVALJS**') === 0)
        console.log(eval(STDIN.slice(10)));

    let Exec = new CheddarExpressionToken(STDIN, 0).exec(),
        Global = new CheddarExecutionEnvironment();
    if (!(Exec instanceof CheddarLexer)) {
        console.log('[SyntaxError: ' + Exec.Index + ']');
    } else {
        let shunt = new CheddarShuntingYard().exec(Exec);
        if (!(shunt instanceof CheddarLexer)) {
            console.log('[StackError: ' + shunt + ']');
        } else {
            console.log("Execution Stack: ", require ?
                require('util').inspect(shunt._Tokens, {showHidden: false, depth: null}) :
                shunt._Tokens);
            let stack = [];
            shunt._Tokens.forEach(item => {
                let simplified = simplify(item);
                if (simplified !== undefined) {
                    if (simplified.constructor.name === 'CheddarProperty')
                        1;//set
                    else
                        stack.push(simplified);
                } else if (item.constructor.name === 'CheddarOperatorToken') {
                    if (item.tok(1)) {//unary
                        let x;
                        try {
                            x = stack.pop();
                            stack.push(PREFIX_OPS.get(item.tok()).get(x.Type)(x));
                        } catch (e) {
                            console.log('[RuntimeError: Operator ' +
                                item.tok() +
                                ' not found for type ' +
                                x.Type.toString() + ']');
                            console.log(e);
                            REPL.close();
                        }
                    } else {
                        let r, l;
                        try {
                            r = stack.pop();
                            l = stack.pop();
                            stack.push(OPS.get(item.tok()).get(l.Type).get(r.Type)(l, r));
                        } catch (e) {
                            console.log('[RuntimeError: Operator ' +
                                item.tok() +
                                ' not found for types ' + l.Type.toString() +
                                ' and ' + r.Type.toString() + ']');
                            console.log(e);
                            REPL.close();
                        }
                    }
                } else {
                    if (item.constructor.name === 'CheddarPropertyToken')
                        console.log('[RuntimeError: Function ' + item._Tokens.join('.') + ' not found]');
                    else
                        console.log('[RuntimeError: Unhandled type ' + item.constructor.name + ' found]');
                }
            });
            console.log(stack[stack.length - 1]);
        }
    }

    REPL.prompt();


}).on('close', () => process.exit(0));