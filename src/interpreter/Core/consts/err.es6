// Runtime Errors
export const RUNTIME = {
    KEY_NOT_FOUND   : Symbol('KEY_NOT_FOUND'),
    KEY_IS_RESERVED : Symbol('KEY_IS_RESERVED')
};

// Semantic Syntactic errors
export const SYNTAX = {
    WHITESPACE_ERROR : Symbol('WHITESPACE_ERROR')
};

// Internal errors
export const INTERNAL = {
    NO_CALL_STACK : Symbol('NO_CALL_STACK')
}