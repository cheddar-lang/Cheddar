import CheddarString from '../primitives/String';
import CheddarNumber from '../primitives/Number';
import CheddarArray  from '../primitives/Array';

export const PRIMITIVE_LINKS = new Map([
    ["CheddarStringToken", CheddarString],
    ["CheddarNumberToken", CheddarNumber],
    ["CheddarArrayToken", CheddarArray]
]);