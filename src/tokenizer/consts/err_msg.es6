import * as _SyntaxError from './err';

export const DESC = new Map([
    [_SyntaxError.EXIT_NOTFOUND, "Could not parse $1"],
    [_SyntaxError.UNEXPECTED_TOKEN, "Unexpected token $1"],
    [_SyntaxError.UNMATCHED_DELIMITER, "Expected a matching delimiter for `$1`"]
]);