import CheddarClass from '../env/class';

import BehaviorOperator from './op/array';
import BehaviorCast from './cast/array';

import CheddarEval from '../eval/eval';

export default class CheddarArray extends CheddarClass {
    static Name = "Array";

    constructor(...items) {
        super();

        for (let i = 0; i < items.length; i++) {
            if (i instanceof CheddarClass) {
                // Is a class
            } else {
                // Is an expression
                //  halp how do this
                // NOTE TO SELF:
                //  IMPLEMENT SCOPE PASSING AND EVALUATION
                //  IMPLEMENT CONSTRUCTION ERRORS
                new CheddarEval(items[i], this.Scope);
            }
        }

        this.value = items;
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