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

    has(token) {
        return RESERVED_KEYWORDS.has(token) ? false : this.Scope.has(token) || (
            this.inheritanceChain && this.inheritanceChain.has(token)
        );
    }

    accessor(token) {
        if (!this.has(token))
            return CheddarError.KEY_NOT_FOUND;

        return this.Scope.get(token);

    }

    access(path) {
        // Access state:
        // <ExecutionEnviorment>
        //  |- ExecutionScope[attempt](path)
        //  ^   |- <ExecutionEnviorment>[has](path)
        //  |       |- <ExecutionScope>[Accessor](access)
        //  |   +--------|
        //  |   |- <ExecutionToken> ===> <OUTPUT>
        //  |_________|

        let access = this.accessor(path.shift());

        if (path.length) {
            if (access instanceof CheddarScope)
                return access.access(path);
            else
                return CheddarError.KEY_NOT_FOUND;
        } else {
            return access;
        }
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
                return this.Scope.set(token, value), token;
        }

    }
}