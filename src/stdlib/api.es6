import CheddarString from '../interpreter/core/primitives/String';
import CheddarNumber from '../interpreter/core/primitives/Number';
import CheddarArray from '../interpreter/core/primitives/Array';
import CheddarBool from '../interpreter/core/primitives/Bool';
import CheddarFunc from '../interpreter/core/env/func';

import * as CheddarError from '../interpreter/core/consts/err';

import CheddarVariable from '../interpreter/core/env/var';
import CheddarScope from '../interpreter/core/env/scope';
import CheddarClass from '../interpreter/core/env/class';

import HelperInit from '../helpers/init';

export default {
    string: CheddarString,
    number: CheddarNumber,
    array: CheddarArray,
    bool: CheddarBool,
    func: CheddarFunc,

    error: CheddarError,

    init: HelperInit,
    make: function() {
        return new CheddarVariable(HelperInit(...arguments), { Writeable: false });
    },
    var: function(val) {
        return new CheddarVariable(val, { Writeable: false });
    },
    namespace: function(val) {
        let Scope = new CheddarScope(null);
        Scope.Scope = val;
        return Scope;
    },

    variable: CheddarVariable,
    class: CheddarClass,
    scope: CheddarScope
};