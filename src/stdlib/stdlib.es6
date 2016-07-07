import API from './api';

let STDLIB = new Map();
STDLIB.Item = (Name) => STDLIB.set(Name, API.var(require(`./ns/${Name}`)(API)));

/** Global Libraries **/
STDLIB.Item("Math");
STDLIB.Item("IO");

/** Primitives **/
STDLIB.set("String",  API.var(API.string));
STDLIB.set("Number",  API.var(API.number));
STDLIB.set("Array",   API.var(API.array));
STDLIB.set("Boolean", API.var(API.bool));

export default STDLIB;