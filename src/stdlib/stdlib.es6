import CheddarVariable from '../interpreter/core/env/var';
import API from './api';

let STDLIB = new Map();
STDLIB.Item = (Name, NS) => STDLIB.set(Name, new CheddarVariable(
    NS(API), { Writeable: false }
))

// Standard Library entries go here
STDLIB.Item(
    "Math",
    require('./ns/math')
)

export default STDLIB;