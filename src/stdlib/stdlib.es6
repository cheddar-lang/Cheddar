import API from './api';

let STDLIB = new Map();
STDLIB.Item = (Name, NOT_SAFE = false) => {
    if (NOT_SAFE && global.SAFE_MODE || global.DISABLE_STDLIB_ITEM === Name) {
        return;
    } else {
        STDLIB.set(Name, API.var(require(`./ns/${Name}`)(API)));
    }
};
STDLIB.p = (Name, Item) => {
    STDLIB.set(Name, API.var(Item));
    STDLIB.set(Name.toLowerCase(), API.var(Item));
};

/** Global Libraries **/
STDLIB.Item("cheddar");

STDLIB.Item("Math");
STDLIB.Item("Rational");

// Interface Libraries
STDLIB.Item("Encoding", require('./ns/Encoding'));
STDLIB.Item("Buffer", require('./ns/Buffer'));
STDLIB.Item("IO", require('./ns/IO'));
STDLIB.Item("fn", require("./ns/fn"));
//STDLIB.Item("HTTP", require('./ns/HTTP'));

/** Primitives **/
STDLIB.p("String",  API.string);
STDLIB.p("Symbol",  API.symbol);
STDLIB.p("Regex",   API.regex);
STDLIB.p("Number",  API.number);
STDLIB.p("Array",   API.array);
STDLIB.p("Boolean", API.bool);

export default STDLIB;
