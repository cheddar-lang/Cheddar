import CheddarBoolean from './primitives/Boolean';
import CheddarNumber from './primitives/Number';
import CheddarString from './primitives/String';
import CheddarArray from './primitives/Array';
import CheddarProperty from './literals/Property';

import {ClassType} from '../../tokenizer/consts/types';

export default function simplify(token) {
    switch (token.Type) {
        case ClassType.Boolean:
            return CheddarBoolean.create(token);
        case ClassType.Number:
            return CheddarNumber.create(token);
        case ClassType.String:
            return CheddarString.create(token);
        case ClassType.Array:
            return CheddarArray.create(token);
    }
    return token.constructor.name === 'CheddarPropertyToken' ?
        CheddarProperty.create(token) :
        undefined;
}