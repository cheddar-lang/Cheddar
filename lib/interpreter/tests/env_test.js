'use strict';

var _readline = require('readline');

var _readline2 = _interopRequireDefault(_readline);

var _env = require('../Core/env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Scope inheritence REPL
// just for testing

let REPL = _readline2.default.createInterface(process.stdin, process.stdout);
REPL.setPrompt('Cheddar> ');
REPL.prompt();

// TODO: assignment
// TODO: how is

REPL.on('line', function (STDIN) {

    if (STDIN === 'exit') REPL.close();

    // Make the global enviorment
    const GLOBAL_ENVIORMENT = new _env2.default();

    // Setup a scope
    const GLOBAL_SCOPE = GLOBAL_ENVIORMENT.make_scope(null);

    REPL.prompt();
}).on('close', () => process.exit(0));