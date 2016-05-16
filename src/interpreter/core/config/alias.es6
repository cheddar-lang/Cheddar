import CheddarString from '../primitives/String';
import CheddarNumber from '../primitives/Number';
import CheddarArray  from '../primitives/Array';
import CheddarBool   from '../primitives/Bool';

export default new Map([
    ['String', CheddarString],
    ['Number', CheddarNumber],
    ['Array' , CheddarArray ],
    ['Bool'  , CheddarBool  ],
]);