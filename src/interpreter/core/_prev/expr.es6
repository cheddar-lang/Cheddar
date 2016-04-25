// == Evaluates Expressions ==
// Perhaps add config item
//  to specify optimizations
// This first version will
//  be a preliminary test
//  and won't have very
//  many features
// Class operators and tokens
//  will be abstracted so
//  changed to `class` won't
//  be deterimental to the
//  existing code.
// This will also allow
//  classes to be forged
//  for testing

// == Info ==
// config:link contains class
//  linktage to primitives,
//  which functions as a basic
//  abstraction layer between
//  the expression parser and
//  the tokenizer.
//   The CheddarClass itself provides
//   a more thougrough abstraction
//   between the tokenizer and the rest
//   of the code itself

import {INTERNAL} from 'consts/err';

export default function CheddarExpressionEval(CallStack) {
    if (!CallStack)
        return INTERNAL.NO_CALL_STACK;

    const CALL_STACK = []; //
}