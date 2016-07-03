import CheddarString from '../interpreter/core/primitives/String';
import CheddarNumber from '../interpreter/core/primitives/Number';
import CheddarArray from '../interpreter/core/primitives/Array';
import CheddarBool from '../interpreter/core/primitives/Bool';
import nil from '../interpreter/core/consts/nil';
import CheddarFunc from '../interpreter/core/env/func';

import * as CheddarError from '../interpreter/core/consts/err';

import CheddarVariable from '../interpreter/core/env/var';
import CheddarScope from '../interpreter/core/env/scope';
import CheddarClass from '../interpreter/core/env/class';

import HelperInit from '../helpers/init';

var API = {
    string: CheddarString,
    number: CheddarNumber,
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
    from: function(val) {
        return new CheddarVariable(val(API), { Writeable: false });
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

    variable: CheddarVariable,
    class: CheddarClass,
    scope: CheddarScope
};

export default API;