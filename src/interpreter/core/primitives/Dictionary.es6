import CheddarClass from '../env/class';

import CheddarEval from '../eval/eval';
import { KEY_INTERNAL } from '../consts/dict';

import BehaviorOperator from './op/dict';
import BehaviorCast from './cast/dict';

import NIL from '../consts/nil';
import CheddarVariable from '../env/var';

import CheddarScope from '../env/scope';

function evaluate(item, scope) {
    return new CheddarEval({ _Tokens: [item] }, scope).exec();
}

function toRepr(item) {
    return KEY_INTERNAL.has(item.constructor.Name) ? item.value : item;
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

            if (typeof tok_value === "string") {
                return tok_value;
            }

            this.value.set(toRepr(tok_key), tok_value);
        }

        // evaluated accessor boilerplate
        this.scope_ref = new CheddarScope();
        let scope_ref_setter = this.scope_ref.setter;
        this.scope_ref.setter = (path, res) => {
            this.value.set(path, res.Value);
            scope_ref_setter.call(this.scope_ref, path, res);
        };

        return true;
    }

    eval_accessor(token) {
        // Go ahead and grab token
        let val = this.value.get(toRepr(token));

        if (!val) return new CheddarVariable(new NIL);

        // Scope boilerplate
        val.scope = this.scope_ref;
        val.Reference = toRepr(token);

        this.scope_ref.setter(val.Reference, val = new CheddarVariable(val));

        return val;
    }

    Operator = new Map([...CheddarClass.Operator, ...BehaviorOperator]);
    Cast = BehaviorCast;
}

//CheddarDictionary.Scope = require('../../../stdlib/primitive/Dictionary/static');
//CheddarDictionary.prototype.Scope = require('../../../stdlib/primitive/Dictionary/lib');
