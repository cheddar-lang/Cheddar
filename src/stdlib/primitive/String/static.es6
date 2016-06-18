import CheddarString from '../../../interpreter/core/primitives/String';
import HelperInit from '../../../helpers/init';

export default new Map([
    ["letters", {Value: HelperInit(CheddarString, "abcdefghijklmnopqrstuvwxyz")}],
    ["digits", {Value: HelperInit(CheddarString, "0123456789")}],
]);