import RuntimeError from './err';

export const DESC = new Map([
    [RuntimeError.RUNTIME.KEY_NOT_FOUND, "Attempted to access undefined key $0"],
    [RuntimeError.RUNTIME.KEY_IS_RESERVED, "Attempted to access reserved keyword $0"],

    [RuntimeError.SYNTAX.WHITESPACE_ERROR, "WHY ARE YOU USING TABS YOU EVIL PERSON/ANIMAL/CREATURE"],

    [RuntimeError.INTERNAL.NO_CALL_STACK, "No call stack provided"]
]);