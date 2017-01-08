import CheddarClass from '../env/class';

import BehaviorOperator from './op/number';
import BehaviorCast from './cast/number';

export default class CheddarNumber extends CheddarClass {
    static Name = "Number";

    init(a,b, value) {
        if (value === undefined || value instanceof CheddarClass || value.prototype instanceof CheddarClass) {
            return "Cannot construct number.";
        }

        this.value = new bindings.number(value);
        return true;
    }

    Operator = new Map([...CheddarClass.Operator, ...BehaviorOperator]);
    Cast = new Map([...CheddarClass.Cast, ...BehaviorCast]);

    get Scope() {
        return require('../../../stdlib/primitive/Number/lib');
    }
}
