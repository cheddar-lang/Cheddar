import RuntimeError from './err';

const MAP = new Map([
    [RuntimeError.KEY_NOT_FOUND, "Attempted to access undefined key $0"],
    [RuntimeError.KEY_IS_RESERVED, "Attempted to access reserved keyword $0"]
]);

export default MAP;