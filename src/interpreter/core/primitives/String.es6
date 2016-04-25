import CheddarClass from '../env/class';

import BehaviorOperator from './op/string';
import BehaviorCast from './cast/string';

export default class CheddarString extends CheddarClass {
    static Name = "String";

    constructor(string) {
        super();

        this.value = string;
    }

    // String is the lowest level class
    //  meaning operators can have directly
    //  defined behavior
    static Operator = new Map([...CheddarClass.Operator, ...BehaviorOperator]);
    static Cast = BehaviorCast;

}