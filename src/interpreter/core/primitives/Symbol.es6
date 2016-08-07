import CheddarClass from '../env/class';

import BehaviorOperator from './op/symbol';
import BehaviorCast from './cast/symbol';

export default class CheddarSymbol extends CheddarClass {
    static Name = "Symbol";

    init(name) {
        if (!name)
            return "Symbol name not provided";
        else if (name.constructor.Name === 'String')
            name = name.value;

        if (typeof name !== 'string')
            return "Symbol name must be string";

        this.value = name;
        return true;
    }

    Operator = new Map([...CheddarClass.Operator, ...BehaviorOperator])
    Cast = BehaviorCast;
}