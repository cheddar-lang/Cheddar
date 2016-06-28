import CheddarString from '../primitives/String';
import CheddarNumber from '../primitives/Number';
import CheddarArray  from '../primitives/Array';
import CheddarBool   from '../primitives/Bool';

console.log(CheddarArray);

export const PRIMITIVE_LINKS = new Map([
    ["CheddarStringToken", CheddarString],
    ["CheddarNumberToken", CheddarNumber],
    ["CheddarArrayToken", CheddarArray],
    ["CheddarBooleanToken", CheddarBool]
]);