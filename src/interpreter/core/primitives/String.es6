import CheddarClass from '../env/class';
import CheddarVariable from '../env/var';

import CheddarScope from '../env/scope';

import NIL from '../consts/nil';

import BehaviorOperator from './op/string';
import BehaviorCast from './cast/string';

function InitalizeSubstring(source) {
    var str = new CheddarString(null, null);
    str.init(source);
    return str;
}

export default class CheddarString extends CheddarClass {
    static Name = "String";

    init(string) {
        // REMOVE THIS
        // console.log(string);
        this.value = string.toString();

        this.scope_ref = new CheddarScope();
        let scope_ref_setter = this.scope_ref.setter;
        this.scope_ref.setter = (path, res) => {
            scope_ref_setter.call(this.scope_ref, path, res);
        };


        return true;
    }

    // String is the lowest level class
    //  meaning operators can have directly
    //  defined behavior
    Operator = new Map([...CheddarClass.Operator, ...BehaviorOperator]);
    Cast = BehaviorCast;

    eval_accessor(type) {
        let val = type.value;
        if (Number.isInteger(val)) {
            if (val < 0) val = this.value.length + val;
            let v = this.value[val];

            if (!v) return new CheddarVariable(new NIL);

            v = InitalizeSubstring(v);
            v.scope = this.scope_ref;
            v.Reference = val + "";
            this.scope_ref.setter(val + "", v = new CheddarVariable(v, {
                Type: CheddarString
            }));

            return v;
        } else {
            return 'accessor must be integer';
        }
    }
}

CheddarString.Scope = require('../../../stdlib/primitive/String/static');
CheddarString.prototype.Scope = require('../../../stdlib/primitive/String/lib');
