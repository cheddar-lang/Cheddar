import CheddarClass from '../env/class';

import CheddarEval from '../eval/eval';
import { KEY_INTERNAL } from '../consts/dict';

import BehaviorOperator from './op/dict';
import BehaviorCast from './cast/dict';

function evaluate(item, scope) {
    return new CheddarEval({ _Tokens: [item] }, scope).exec();
}

export default class CheddarDictionary extends CheddarClass {
    static Name = "Dictionary";

    init(dict) {
        this.value = new Map();

        // Dictionary entries [ktok, vtok]
        let entries = dict._Tokens;
        let entry;

        // Evaluate & move to `this.value`
        for (var i = 0; i < entries.length; i++) {
            entry = entries[i]._Tokens;
            let tok_key = evaluate(entry[0], this.scope);

            if (typeof tok_key === "string") {
                return tok_key;
            }

            let tok_value = evaluate(entry[1], this.scope);

            if (typeof tok_key === "string") {
                return tok_key;
            }

            if (KEY_INTERNAL.has(tok_key.constructor.Name)) {
                this.value.set(tok_key.value, tok_value);
            } else {
                this.value.set(tok_key, tok_value);
            }
        }

        return true;
    }

    Operator = new Map([...CheddarClass.Operator, ...BehaviorOperator]);
    Cast = BehaviorCast;
}

//CheddarDictionary.Scope = require('../../../stdlib/primitive/Dictionary/static');
//CheddarDictionary.prototype.Scope = require('../../../stdlib/primitive/Dictionary/lib');