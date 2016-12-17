import CheddarClass from '../env/class';

import BehaviorOperator from './op/symbol';
import BehaviorCast from './cast/symbol';

const GLOBAL_SYMBOL_REGISTRY = new Map();

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

        if (GLOBAL_SYMBOL_REGISTRY.has(name)) return GLOBAL_SYMBOL_REGISTRY.get(name);
        else GLOBAL_SYMBOL_REGISTRY.set(name, this);

        return true;
    }

    Operator = new Map([...CheddarClass.Operator, ...BehaviorOperator])
    Cast = new Map([...CheddarClass.Cast, ...BehaviorCast]);
}
