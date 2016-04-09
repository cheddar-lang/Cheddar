'use strict';

var _readline = require('readline');

var _readline2 = _interopRequireDefault(_readline);

var _expr = require('../../tokenizer/parsers/expr');

var _expr2 = _interopRequireDefault(_expr);

var _shunting_yard = require('../../tokenizer/tok/shunting_yard');

var _shunting_yard2 = _interopRequireDefault(_shunting_yard);

var _lex = require('../../tokenizer/tok/lex');

var _lex2 = _interopRequireDefault(_lex);

var _exec_env = require('../Core/environment/exec_env');

var _exec_env2 = _interopRequireDefault(_exec_env);

var _simplify = require('../Core/simplify');

var _simplify2 = _interopRequireDefault(_simplify);

var _operators = require('../Core/operators');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let REPL = _readline2.default.createInterface(process.stdin, process.stdout);
REPL.setPrompt('Cheddar> ');
REPL.prompt();

// TODO: assignment
// TODO: how is

REPL.on('line', function (STDIN) {

    if (STDIN === 'exit') REPL.close();
    if (STDIN.indexOf('**EVALJS**') === 0) console.log(eval(STDIN.slice(10)));

    let Exec = new _expr2.default(STDIN, 0).exec(),
        Global = new _exec_env2.default();
    if (!(Exec instanceof _lex2.default)) {
        console.log('[SyntaxError: ' + Exec.Index + ']');
    } else {
        let shunt = new _shunting_yard2.default().exec(Exec);
        if (!(shunt instanceof _lex2.default)) {
            console.log('[StackError: ' + shunt + ']');
        } else {
            console.log("Execution Stack: ", require ? require('util').inspect(shunt._Tokens, { showHidden: false, depth: null }) : shunt._Tokens);
            let stack = [];
            shunt._Tokens.forEach(item => {
                let simplified = (0, _simplify2.default)(item);
                if (simplified !== undefined) {
                    stack.push(simplified);
                } else if (item.constructor.name === 'CheddarOperatorToken') {
                    if (item.tok(1)) {
                        //unary
                        let x;
                        try {
                            x = stack.pop();
                            stack.push(_operators.PREFIX_OPS.get(item.tok()).get(x.Type)(x));
                        } catch (e) {
                            console.log('[RuntimeError: Operator ' + item.tok() + ' not found for type ' + x.Type.toString() + ']');
                            console.log(e);
                            REPL.close();
                        }
                    } else {
                        let r, l;
                        try {
                            r = stack.pop();
                            l = stack.pop();
                            stack.push(_operators.OPS.get(item.tok()).get(l.Type).get(r.Type)(l, r));
                        } catch (e) {
                            console.log('[RuntimeError: Operator ' + item.tok() + ' not found for types ' + l.Type.toString() + ' and ' + r.Type.toString() + ']');
                            console.log(e);
                            REPL.close();
                        }
                    }
                } else {
                    if (item.constructor.name === 'CheddarPropertyToken') console.log('[RuntimeError: Function ' + item._Tokens.join('.') + ' not found]');else console.log('[RuntimeError: Unhandled type ' + item.constructor.name + ' found]');
                }
            });
            console.log(stack[stack.length - 1]);
        }
    }

    REPL.prompt();
}).on('close', () => process.exit(0));