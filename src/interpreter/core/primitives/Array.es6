import CheddarClass from '../env/class';
import CheddarVariable from '../env/var';
import CheddarScope from '../env/scope';

import NIL from '../consts/nil';

import {MALFORMED_TOKEN} from '../consts/err';


import BehaviorOperator from './op/array';
import BehaviorCast from './cast/array';

export default class CheddarArray extends CheddarClass {
    static Name = "Array";

    init(...items) {
        let CheddarEval = require('../eval/eval');
        this.value = [];

        this.scope_ref = new CheddarScope();
        let scope_ref_setter = this.scope_ref.setter;
        this.scope_ref.setter = (path, res) => {
            // Implicitly casts down path.toString() to number
            let index = +path;
            // Fill in empty items
            while (this.value.length < index) {
                this.value.push(new NIL);
            }

            this.value[index] = res.Value;
            scope_ref_setter.call(this.scope_ref, path, res);
        };

        for (let i = 0; i < items.length; i++) {
            if (items[i] instanceof CheddarClass) {
                // Is a class
                this.value.push(items[i]);
            } else if (items[i].constructor.name === "CheddarExpressionToken") {
                // Is an expression
                let res = new CheddarEval({ _Tokens: [items[i]] }, this.scope).exec();
                if (typeof res === "string") {
                    return res;
                } else if (!res) {
                    if (i && i !== items.length - 1) {
                        this.value.push(new NIL);
                    }
                } else {
                    this.value.push(res);
                }
            } else {
                return MALFORMED_TOKEN;
            }
        }

        return true;
    }

    // TODO: replace with Cheddar generator
    // send a `yield` signal probably
    iterator() {

    }

    reverse() {
        this.value.reverse();
        return this;
    }

    get Scope() {
        return require('../../../stdlib/primitive/Array/lib');
    }

    // Accessor to redirect [n]
    eval_accessor(type) {
        if (type.value.isInteger()) {
            let v = type.value.accessAt(this.value);

            if (!v) v = new NIL;

            v.scope = this.scope_ref;
            v.Reference = type.value;
            this.scope_ref.setter(type.value, v = new CheddarVariable(v));

            return v;
        } else {
            return 'accessor must be integer';
        }
    }

    // String is the lowest level class
    //  meaning operators can have directly
    //  defined behavior
    Operator = new Map([...CheddarClass.Operator, ...BehaviorOperator]);
    Cast = new Map([...CheddarClass.Cast, ...BehaviorCast]);
}

CheddarArray.Scope = require('../../../stdlib/primitive/Array/static');
