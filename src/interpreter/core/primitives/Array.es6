import CheddarClass from '../env/class';

import {MALFORMED_TOKEN} from '../consts/err';

import BehaviorOperator from './op/array';
import BehaviorCast from './cast/array';

export default class CheddarArray extends CheddarClass {
    static Name = "Array";

    init(...items) {
        let CheddarEval = require('../eval/eval');
        this.value = [];

        for (let i = 0; i < items.length; i++) {
            if (items[i] instanceof CheddarClass) {
                // Is a class
                this.value.push(items[i]);
            } else if (items[i].constructor.name === "CheddarExpressionToken") {
                // Is an expression
                this.value.push(new CheddarEval(items[i], this.Scope).exec());
            } else {
                return MALFORMED_TOKEN;
            }
        }

        return true;
    }

    reverse() {
        this.value.reverse();
        return this;
    }

    // String is the lowest level class
    //  meaning operators can have directly
    //  defined behavior
    static Operator = new Map([...CheddarClass.Operator, ...BehaviorOperator]);
    static Cast = BehaviorCast;

}