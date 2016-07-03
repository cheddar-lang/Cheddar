import API from './api';

let STDLIB = new Map();
STDLIB.Item = (Name, NS) => STDLIB.set(Name, API.var(NS(API)));

/** Global Libraries **/
import LIBMath from './ns/math';
STDLIB.Item("Math", LIBMath);

import LIBIO from './ns/IO';
STDLIB.Item("IO", LIBIO);

/** Primitives **/
STDLIB.set("String",  API.var(API.string));
STDLIB.set("Number",  API.var(API.number));
STDLIB.set("Array",   API.var(API.array));
STDLIB.set("Boolean", API.var(API.bool));

export default STDLIB;