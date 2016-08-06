import API from './api';

let STDLIB = new Map();
STDLIB.Item = (Name, LIB, NOT_SAFE = false) => {
    if (NOT_SAFE && global.SAFE_MODE) {
        return;
    } else {
        STDLIB.set(Name, API.var(LIB(API)));
    }
};

/** Global Libraries **/
STDLIB.Item("Math");
STDLIB.Item("Encoding");
STDLIB.Item("Buffer");
STDLIB.Item("IO");
STDLIB.Item("HTTP");
STDLIB.Item("Rational"); // Rational extension written by LegionMammal978

/** Primitives **/
STDLIB.set("String",  API.var(API.string));
STDLIB.set("Symbol",  API.var(API.symbol));
STDLIB.set("Regex",  API.var(API.regex));
STDLIB.set("Number",  API.var(API.number));
STDLIB.set("Array",   API.var(API.array));
STDLIB.set("Boolean", API.var(API.bool));

export default STDLIB;
