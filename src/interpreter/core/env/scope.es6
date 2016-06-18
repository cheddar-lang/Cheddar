// Basic idea of the Execution Enviorments:
//
//  ExecutionEnviorment
//    |    ^
//    |- Sandboxed Enviorment
//    |    |- Crossdepedent scoping
//    |    |    ^
//    |    v    | - Inheritence Chain
//    |- Scope  v
//    |   |- Inheritence
//    |- Preset data

import * as CheddarError from '../consts/err';
import {RESERVED_KEYWORDS} from '../../../tokenizer/consts/ops';

import CheddarVariable from './var';

export default class CheddarScope {
    constructor(inherit = null, preset = new Map()) {
        // Initialize the hash
        this.Scope = preset;

        // Global scope
        // Make sure to move preset items
        // Avoid duplicating scopes
        //  by providing a loopup within
        //  a seperate hash which is linked
        //  by overriding a properties get
        this.inheritanceChain = inherit;

    }

    make(Name, Type, Value, Arguments) {
        let A = new Type(this, Name),
            B;

        if ((B = A.init(...Value)) === true)
            return this.Scope.set(Name, new CheddarVariable(A, Arguments));
        else
            return B;
    }

    // STATIC
    static Scope = new Map();
    static has(token) {
        return !RESERVED_KEYWORDS.has(token) & this.Scope.has(token)
    }
    static manage(token, value) {
        if (RESERVED_KEYWORDS.has(token)) {
            return CheddarError.KEY_IS_RESERVED
        } else {
            return this.setter(token, value), token;
        }
    }
    static setter(token, value) {
        this.Scope.set(token, value);
    }
    static accessor(token) {
        return this.Scope.get(token);
    }

    // DYNAMIC
    has(token) {
        return RESERVED_KEYWORDS.has(token) ? false : this.Scope.has(token) || (
            this.inheritanceChain && this.inheritanceChain.has(token)
        );
    }

    manage(token, value) {
        if (this.inheritanceChain && this.inheritanceChain.has(token)) {
            // It's in the inheritance chain
            // just use the parent's function
            return this.inheritanceChain.manage(token, value);

        } else {
            if (RESERVED_KEYWORDS.has(token))
                return CheddarError.KEY_IS_RESERVED;
            else
                return this.setter(token, value), token;
        }

    }

    // Property accessors
    accessor(token) {
        if (!this.has(token))
            return CheddarError.KEY_NOT_FOUND;

        return this.Scope.get(token) || (this.inheritanceChain ?
            this.inheritanceChain.accessor(token) : CheddarError.KEY_NOT_FOUND
        );

    }

    setter(path, setter) {
        this.Scope.set(path, setter);
    }
}