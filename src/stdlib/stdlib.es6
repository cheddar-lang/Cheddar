import API from './api';

let STDLIB = new Map();
STDLIB.Item = (Name, NS) => STDLIB.set(Name, API.var(NS(API)));

/** Standard Library entries go here **/
// Preset namespaces
import LIBMath from './ns/math';
STDLIB.Item("Math", LIBMath);

// Default classes
STDLIB.set("String", API.var(API.string));
STDLIB.set("Number", API.var(API.number));
STDLIB.set("Array", API.var(API.array));
STDLIB.set("Boolean", API.var(API.bool));

export default STDLIB;