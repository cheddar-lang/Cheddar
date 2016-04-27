import CheddarClass from '../env/class';

import BehaviorOperator from './op/bool';
import BehaviorCast from './cast/bool';

export default class CheddarBool extends CheddarClass {
    static Name = "Boolean";

    constructor(bool) {
        super();

        this.value = Boolean(bool);
    }

    // String is the lowest level class
    //  meaning operators can have directly
    //  defined behavior
    static Operator = new Map([...CheddarClass.Operator, ...BehaviorOperator]);
    static Cast = BehaviorCast;

}