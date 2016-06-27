import * as _SyntaxError from './err';

export default new Map([
    [_SyntaxError.EXIT_NOTFOUND, "Abnormal syntax at $LOC"],
    [_SyntaxError.UNEXPECTED_TOKEN, "Unexpected token at $LOC"],
    [_SyntaxError.UNMATCHED_DELIMITER, "Expected a matching delimiter for `$1` at $LOC"],
    [_SyntaxError.EXPECTED_BLOCK, "Expected a code block at $LOC"]
]);