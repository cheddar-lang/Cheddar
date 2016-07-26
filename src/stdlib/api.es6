import CheddarString from '../interpreter/core/primitives/String';
import CheddarSymbol from '../interpreter/core/primitives/Symbol';
import CheddarNumber from '../interpreter/core/primitives/Number';
import CheddarRegex from '../interpreter/core/primitives/Regex';
import CheddarArray from '../interpreter/core/primitives/Array';
import CheddarBool from '../interpreter/core/primitives/Bool';
import nil from '../interpreter/core/consts/nil';
import CheddarFunc from '../interpreter/core/env/func';

import * as CheddarError from '../interpreter/core/consts/err';

import CheddarVariable from '../interpreter/core/env/var';
import CheddarScope from '../interpreter/core/env/scope';
import CheddarClass from '../interpreter/core/env/class';

import HelperInit from '../helpers/init';

CheddarClass.merge = {
    accessor(override) {
        return function(target) {
            this.Scope.get(target) || override(target) || null;
        };
    }
};

var API = {
    string: CheddarString,
    symbol: CheddarSymbol,
    number: CheddarNumber,
    regex: CheddarRegex,
    array: CheddarArray,
    bool: CheddarBool,
    func: CheddarFunc,
    nil: nil,

    error: CheddarError,

    // Make a literal
    init: HelperInit,

    // Make a variable AND literal
    make: function() {
        return new CheddarVariable(HelperInit(...arguments), { Writeable: false });
    },

    // Make a variable
    var: function(val) {
        return new CheddarVariable(val, { Writeable: false });
    },

    // Make a variable from an implementation
    from: function(val, ...args) {
        return new CheddarVariable(val(API, ...args), { Writeable: false });
    },

    // Make a property (getters & setters)
    prop: function(getter = null, setter = null) {
        return new CheddarVariable(null, {
            Writeable: false,
            getter: getter,
            setter: setter
        });
    },

    // Make a namespace given a map
    namespace: function(val) {
        let Scope = new CheddarScope(null);
        Scope.Scope = new Map(val);
        return Scope;
    },

    nstoclass: function(input) {
        let ns = new CheddarClass(null);
        ns.Name = "Namespace";
        ns.Scope = input.Scope;
        return ns;
    },

    variable: CheddarVariable,
    class: CheddarClass,
    scope: CheddarScope
};

export default API;