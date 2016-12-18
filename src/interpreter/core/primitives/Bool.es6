import CheddarClass from '../env/class';
import NIL from '../consts/nil';

import BehaviorOperator from './op/bool';
import BehaviorCast from './cast/bool';

export default class CheddarBool extends CheddarClass {
    static Name = "Boolean";

    init(bool) {

        // Determine false or true
        if (bool) {
            switch (typeof bool.value) {
                case "string":
                    this.value = bool.value !== "";
                    break;
                case "number":
                    this.value = bool.value !== 0;
                    break;
                case "boolean":
                    this.value = bool.value;
                    break;
                default:
                    if ((bool.value) instanceof Array) {
                        this.value = bool.value.length > 0;
                    } else {
                        if (bool instanceof NIL) {
                            this.value = false;
                        } else {
                            this.value = true;
                        }
                    }
            }
        } else {
            this.value = false;
        }

        return true;
    }

    // String is the lowest level class
    //  meaning operators can have directly
    //  defined behavior
    Operator = new Map([...CheddarClass.Operator, ...BehaviorOperator]);
    Cast = new Map([...CheddarClass.Cast, ...BehaviorCast]);
}
