// Scope inheritence REPL
// just for testing

/*
Enviorment
 |- ExecutionEnviorment
     |- List<>
         |- Hash<Variable, Value>
 |-
*/

import readline from 'readline';

import Enviorment from '../Core/env';

let REPL = readline.createInterface(process.stdin, process.stdout);
REPL.setPrompt('CheddarExecutionEnv> ');
REPL.prompt();

// TODO: assignment
// TODO: how is

REPL.on('line', function(STDIN) {

    if (STDIN === 'exit') REPL.close()

    // Make the global enviorment
    const GLOBAL_ENVIORMENT = new Enviorment();

    // Setup a scope
    const GLOBAL_SCOPE = GLOBAL_ENVIORMENT.setup

    REPL.prompt();

}).on('close', () => process.exit(0));