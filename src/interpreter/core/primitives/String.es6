import CheddarClass from '../env/class';

import BehaviorOperator from './op/string';
import BehaviorCast from './cast/string';

export default class CheddarString extends CheddarClass {
    static Name = "String";

    init(string) {
        this.value = string;
        return true;
    }

    // String is the lowest level class
    //  meaning operators can have directly
    //  defined behavior
    static Operator = new Map([...CheddarClass.Operator, ...BehaviorOperator]);
    static Cast = BehaviorCast;

}