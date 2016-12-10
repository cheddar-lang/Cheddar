import CheddarDictionary from '../primitives/Dictionary';
import CheddarSymbol     from '../primitives/Symbol';
import CheddarString     from '../primitives/String';
import CheddarNumber     from '../primitives/Number';
import CheddarArray      from '../primitives/Array';
import CheddarRegex      from '../primitives/Regex';
import CheddarBool       from '../primitives/Bool';
import CheddarNil        from '../consts/nil';
import CheddarFunc       from '../env/func';

export const PRIMITIVE_LINKS = new Map([
    ["CheddarNilToken"     , CheddarNil],
    ["CheddarFunctionToken", CheddarFunc],
    ["CheddarBooleanToken" , CheddarBool],
    ["CheddarRegexToken"   , CheddarRegex],
    ["CheddarArrayToken"   , CheddarArray],
    ["CheddarSymbolToken"  , CheddarSymbol],
    ["CheddarStringToken"  , CheddarString],
    ["CheddarNumberToken"  , CheddarNumber],
    ["CheddarDictToken"    , CheddarDictionary],
]);

import CheddarFunctionizedOperator from '../evaluated/fop';
import CheddarFunctionizedProperty from '../evaluated/fprop';

export const EVALUATED_LINKS = new Map([
    ["CheddarFunctionizedOperatorToken", CheddarFunctionizedOperator],
    ["CheddarFunctionizedPropertyToken", CheddarFunctionizedProperty],
]);
