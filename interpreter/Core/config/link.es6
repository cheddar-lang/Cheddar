import CheddarString from '../primitives/String';
import CheddarNumber from '../primitives/Number';
import CheddarArray from '../primitives/Array';
import CheddarBool from '../primitives/Bool';

export const LITERAL_LINKS = new Map([
    ["CheddarStringToken", CheddarString],
    ["CheddarNumberToken", CheddarNumber],
    ["CheddarBooleanToken", CheddarBool]
    ["CheddarArrayToken", CheddarArray],
]);