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

export default class CheddarClass extends CheddarScope {
    static Name = "Class";

    // Define operators. Each item in the
    //  hash-map, defines behavior for the
    //  specific token in an OperatorToken
    // Operators:HashMap<Token, Behavior(LHS, RHS)>
    // Unary operators will RHS explicitly be
    //  an unabstrated, native, `null` value
    //  which will require an interface in order
    //  for a Cheddar unary operator interface
    //
    //     Operator = DEFAULT_OP;
    //     Cast = DEFAULT_CAST;
    //
    // See CheddarScope for details

    // TODO: Write some superflicious and redundant
    //  explanation elaborating on the abstract
    //  nature of this particulator subject of matter
    //  being discussed.
    constructor(Scope = null, Reference = null) {
        super();

        // CheddarClass serves as an interface
        //  for higher-level classes.

        // Provide scope construction interface
        this.scope = Scope;
        this.Reference = Reference;
    }

    // Initialize class
    // This method is to be overloaded
    //  and provide an simple interface
    //  in which details can be passed to
    //  the interpreter while data of the
    //  class itself can remain sandboxed
    init() {

        // This abstract interface should never
        //  be constructed.
        return CheddarError.ABSTRACT_USED;
    }
}