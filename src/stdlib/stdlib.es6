import API from './api';

let STDLIB = new Map();
STDLIB.Item = (Name, LIB) => STDLIB.set(Name, API.var(LIB(API)));

/** Global Libraries **/
STDLIB.Item("cheddar", require('./ns/cheddar'));

STDLIB.Item("Math", require('./ns/Math'));

// Interface Libraries
STDLIB.Item("Encoding", require('./ns/Encoding'));
STDLIB.Item("Buffer", require('./ns/Buffer'));
STDLIB.Item("IO", require('./ns/IO'));
STDLIB.Item("fn", require("./ns/fn"));
//STDLIB.Item("HTTP", require('./ns/HTTP'));

/** Primitives **/
STDLIB.set("String",  API.var(API.string));
STDLIB.set("Symbol",  API.var(API.symbol));
STDLIB.set("Regex",  API.var(API.regex));
STDLIB.set("Number",  API.var(API.number));
STDLIB.set("Array",   API.var(API.array));
STDLIB.set("Boolean", API.var(API.bool));

export default STDLIB;
