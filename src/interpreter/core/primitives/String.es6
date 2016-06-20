import CheddarClass from '../env/class';

import BehaviorOperator from './op/string';
import BehaviorCast from './cast/string';

import LibStatic from '../../../stdlib/primitive/String/static';
import LibString from '../../../stdlib/primitive/String/lib';

export default class CheddarString extends CheddarClass {
    static Name = "String";

    init(string) {
        this.value = string;
        return true;
    }

    static Scope = LibStatic;
    Scope = LibString;

    // String is the lowest level class
    //  meaning operators can have directly
    //  defined behavior
    static Operator = new Map([...CheddarClass.Operator, ...BehaviorOperator]);
    static Cast = BehaviorCast;

}

CheddarString.Scope = require('../../../stdlib/primitive/String/static');
CheddarString.prototype.Scope = require('../../../stdlib/primitive/String/lib');