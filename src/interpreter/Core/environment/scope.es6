import * as CheddarError from '../consts/err';
import {RESERVED_KEYWORDS} from '../../../tokenizer/consts/ops';

export default class CheddarExecutionScope {
    constructor(inherit = null) {
        // Initialize the hash
        this.Scope = new Map();
        this.inheritanceChain = inherit;
    }

    access(token) {
        if (!this.Scope.has(token))
            return CheddarError.KEY_NOT_FOUND;

        if (RESERVED_KEYWORDS.has(token))
            return CheddarError.KEY_IS_RESERVED;

        return this.Scope.get(token);
    }
    manage(token, value) { return this.Scope.set(token, value) }
}