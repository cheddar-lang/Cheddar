import * as CheddarError from '../consts/err';
import {RESERVED_KEYWORDS} from '../../../tokenizer/consts/ops';

export default class CheddarExecutionScope {
    constructor(inherit = null) {
        // Initialize the hash
        this.Scope = new Map();
        this.inheritanceChain = inherit;
    }

    has(token) {
        return RESERVED_KEYWORDS.has(token) ? false : this.Scope.has(token) || (
            this.inheritanceChain && this.inheritanceChain.has(token)
        );
    }

    access(token) {
        // Throw a different error for reserved tokens
        if (RESERVED_KEYWORDS.has(token))
            return CheddarError.KEY_IS_RESERVED;

        if (!this.has(token))
            return CheddarError.KEY_NOT_FOUND;

        return this.Scope.get(token);
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