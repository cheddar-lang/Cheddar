import RuntimeError from './err';

export default new Map([
    [RuntimeError.KEY_NOT_FOUND, "Attempted to access undefined variable ($0)"],
    [RuntimeError.KEY_IS_RESERVED, "Attempted to access reserved keyword $0"],

    [RuntimeError.NO_OP_BEHAVIOR, "`$0` has no behavior for types `$2` and `$1`"],
    [RuntimeError.NOT_A_REFERENCE, "Left side of assignment is not a reference"],
    [RuntimeError.CANNOT_READ_PROP, "Cannot read property `$0` of nil (`$1`)"],

    [RuntimeError.UNLINKED_CLASS, "InternalError: Token `$0` has no link."],
    [RuntimeError.MALFORMED_TOKEN, "InternalError: Recieved a malformed token at callstack ref. $0"],
    [RuntimeError.ABSTRACT_USED, "InternalError: Attempted to construct an abstract interface"]
]);