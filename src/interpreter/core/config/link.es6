import CheddarString from '../primitives/String';
import CheddarNumber from '../primitives/Number';
import CheddarArray  from '../primitives/Array';
import CheddarRegex  from '../primitives/Regex';
import CheddarBool   from '../primitives/Bool';
import CheddarNil    from '../consts/nil';
import CheddarFunc   from '../env/func';

export const PRIMITIVE_LINKS = new Map([
    ["CheddarBooleanToken" , CheddarBool],
    ["CheddarNilToken"     , CheddarNil],
    ["CheddarStringToken"  , CheddarString],
    ["CheddarNumberToken"  , CheddarNumber],
    ["CheddarArrayToken"   , CheddarArray],
    ["CheddarRegexToken"   , CheddarRegex],
    ["CheddarFunctionToken", CheddarFunc]
]);

import CheddarFunctionizedOperator from '../evaluated/fop';

export const EVALUATED_LINKS = new Map([
    ["CheddarFunctionizedOperatorToken", CheddarFunctionizedOperator]
]);