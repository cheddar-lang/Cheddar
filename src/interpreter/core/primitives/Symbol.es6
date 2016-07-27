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

        if (!global.CHEDDAR_OPTS.SYMBOL_REGISTRY) global.CHEDDAR_OPTS.SYMBOL_REGISTRY = new Set();

        this.value = global.CHEDDAR_OPTS.SYMBOL_REGISTRY.has(name) ? name :
                     (global.CHEDDAR_OPTS.SYMBOL_REGISTRY.add(name), name);
        return true;
    }

    static Operator = new Map([...CheddarClass.Operator, ...BehaviorOperator])
    static Cast = BehaviorCast;
}