import CheddarDictionary from '../interpreter/core/primitives/Dictionary';
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

// Handle bindings for early hook
if (!global.bindings)
    global.bindings = require('../../bindings/');

var API = {
    dictionary: CheddarDictionary,
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

    // Run from source CST
    // Use with compile-cheddar plugin
    src: function(CST, stdlibItem) {
        let scope = new CheddarScope(null);
        delete require.cache[require.resolve('./stdlib')]
        scope.Scope = new Map(require('./stdlib'));

        global.DISABLE_STDLIB_ITEM = stdlibItem;
        let interpreter = require('../interpreter/exec');
        global.DISABLE_STDLIB_ITEM = undefined;

        let exec = new interpreter(CST, scope);
        let res = exec.exec(global.CHEDDAR_OPTS);

        if (typeof res === "string") {
            throw new Error(res);
        }

        if (!CST.PreCompiledNodeName) throw new Error("No nametag given");
        return [ CST.PreCompiledNodeName, scope.accessor('main') ]
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
    scope: CheddarScope,

    merge: {
        Operator(op) {
            return new Map([...CheddarClass, ...op]);
        }
    }
};

export default API;
