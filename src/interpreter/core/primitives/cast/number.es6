import CheddarString from '../String';

export default new Map([
    [CheddarString, (LHS) => new CheddarString(LHS.value)]
]);