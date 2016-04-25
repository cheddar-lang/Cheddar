import CheddarClass from '../env/class';

import BehaviorOperator from './op/number';
import BehaviorCast from './cast/number';

export default class CheddarNumber extends CheddarClass {
    static Name = "Number";

    constructor(base, bitshift, value) {
        super();

        // TODO: Optimize
        if (bitshift)
            value += "0".repeat(bitshift);

        this.value = parseInt(value, +base);
    }

    // String is the lowest level class
    //  meaning operators can have directly
    //  defined behavior
    static Operator = new Map([...CheddarClass.Operator, ...BehaviorOperator]);
    static Cast = BehaviorCast;
}