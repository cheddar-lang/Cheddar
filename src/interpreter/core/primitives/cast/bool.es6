import CheddarString from '../String';
import CheddarNumber from '../Number';

export default new Map([
    [CheddarString, (RHS) => RHS.value + ""],
    [CheddarNumber, (RHS) => +RHS]
]);