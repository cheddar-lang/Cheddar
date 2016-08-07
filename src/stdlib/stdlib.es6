import API from './api';

let STDLIB = new Map();
STDLIB.Item = (Name, LIB, NOT_SAFE = false) => {
    if (NOT_SAFE && global.SAFE_MODE) {
        return;
    } else {
        STDLIB.set(Name, API.var(LIB(API)));
    }
};
STDLIB.p = (Name, Item) => {
    STDLIB.set(Name, API.var(Item));
    STDLIB.set(Name.toLowerCase(), API.var(Item));
};

/** Global Libraries **/
STDLIB.Item("Math");
STDLIB.Item("Encoding");
STDLIB.Item("Buffer");
STDLIB.Item("IO");
STDLIB.Item("HTTP");
STDLIB.Item("Rational"); // Rational extension written by LegionMammal978

/** Primitives **/
STDLIB.p("String",  API.string);
STDLIB.p("Symbol",  API.symbol);
STDLIB.p("Regex",   API.regex);
STDLIB.p("Number",  API.number);
STDLIB.p("Array",   API.array);
STDLIB.p("Boolean", API.bool);

export default STDLIB;
