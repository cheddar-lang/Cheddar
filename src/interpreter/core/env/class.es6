// == CheddarClass ==
// The Cheddar Class is a critical component in
//  Cheddar execution. All literals either are
//  constructed upon an internal or external
//  classes.
// The class layer provides a custom set of
//  all functions to provide a distinct level
//  of abstraction throughout the interpreter

// == Info ==
// The classes implementation is designed to
//  provide a significant level of abstraction
//  as stated before
// Various parts to interface with operators
//  and scopes are added through seperate
//  classes.

// == Proccess ==
// A classes construction is illustration in the
//  following diagram:
//
//               Class
//    ____________|______________
//    |           |             |
//  args        main()       instance
//           _____|________
//           |    |       |
//        scope main()  return
//
// Within the constructor. The class stores an
//  internal scope as itself is an extention of
//  CheddarScope. Built-ins are merged through
//  main() whether implicit or explicit.

import CheddarScope from './scope';
import * as CheddarError from '../consts/err';

import { DEFAULT_OP, DEFAULT_CAST } from './defaults';

export default class CheddarClass extends CheddarScope {
    static Name = "UNDEFINED";
    // Define operators. Each item in the
    //  hash-map, defines behavior for the
    //  specific token in an OperatorToken
    // Operators:HashMap<Token, Behavior(LHS, RHS)>
    // Unary operators will RHS explicitly be
    //  an unabstrated, native, `null` value
    //  which will require an interface in order
    //  for a Cheddar unary operator interface
    static Operator = DEFAULT_OP;
    static Cast = DEFAULT_CAST;

    Scope = new CheddarScope();

    // TODO: Write some superflicious and redundant
    //  explanation elaborating on the abstract
    //  nature of this particulator subject of matter
    //  being discussed.
    constructor() {
        super();
        // CheddarClass serves as an interface
        //  for higher-level classes.

        // This abstract interface should never
        //  be constructed.
        this.ErrorStream = CheddarError.ABSTRACT_USED;
    }
}