import CheddarClass from '../env/class';

import BehaviorOperator from './op/array';
import BehaviorCast from './cast/array';

import CheddarEval from '../eval/eval';

export default class CheddarArray extends CheddarClass {
    static Name = "Array";

    init(...items) {

        for (let i = 0; i < items.length; i++) {
            if (i instanceof CheddarClass) {
                // Is a class
            } else {
                // Is an expression
                new CheddarEval(items[i], this.Scope);
            }
        }

        this.value = items;
        return true;
    }

    reverse() {
        this.value.reverse(); //this is only so the array thing works, for cheddar there can be an immutable method
        return this;
    }

    // String is the lowest level class
    //  meaning operators can have directly
    //  defined behavior
    static Operator = new Map([...CheddarClass.Operator, ...BehaviorOperator]);
    static Cast = BehaviorCast;

}