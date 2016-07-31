import CheddarArray from '../../../interpreter/core/primitives/Array';
import CheddarString from '../../../interpreter/core/primitives/String';
import HelperInit from '../../../helpers/init';

export default new Map([
    ["letters", {Value: HelperInit(CheddarArray, ...[..."abcdefghijklmnopqrstuvwxyz"].map(s => HelperInit(CheddarString, s)))}],
    ["digits", {Value: HelperInit(CheddarArray, ...[..."0123456789"].map(s => HelperInit(CheddarString, s)))}],
    ["alphanumeric", {Value: HelperInit(CheddarArray, ...[..."abcdefghijklmnopqrstuvwxyz0123456789"].map(s => HelperInit(CheddarString, s)))}],
    ["dquo", {Value: HelperInit(CheddarString, '"')}],
    ["squo", {Value: HelperInit(CheddarString, "'")}]
]);
