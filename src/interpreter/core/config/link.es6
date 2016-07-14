import CheddarString from '../primitives/String';
import CheddarNumber from '../primitives/Number';
import CheddarArray  from '../primitives/Array';
import CheddarBool   from '../primitives/Bool';
import CheddarNil    from '../consts/nil';
import CheddarFunc   from '../env/func';

export const PRIMITIVE_LINKS = new Map([
    ["CheddarBooleanToken" , CheddarBool],
    ["CheddarNilToken"     , CheddarNil],
    ["CheddarStringToken"  , CheddarString],
    ["CheddarNumberToken"  , CheddarNumber],
    ["CheddarArrayToken"   , CheddarArray],
    ["CheddarFunctionToken", CheddarFunc]
]);

import CheddarFunctionizedOperator from '../evaluated/fop';

export const EVALUATED_LINKS = new Map([
    ["CheddarFunctionizedOperatorToken", CheddarFunctionizedOperator]
]);