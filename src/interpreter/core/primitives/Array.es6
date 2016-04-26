import CheddarClass from '../env/class';

import BehaviorOperator from './op/array';
import BehaviorCast from './cast/array';

export default class CheddarArray extends CheddarClass {
    static Name = "Array";

    constructor(...items) {
        super();

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