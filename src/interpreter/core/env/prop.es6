import CheddarScope from './scope';
import CheddarVariable from './var';
import CheddarFunction from './func';

export default class CheddarProperty extends CheddarFunction {
    constructor(body, preset = null) {
        super([], body, preset);
    }

    /** @override */
    scope(_, self) {
        let args = new CheddarScope();
        if (self)
            args.setter("self", new CheddarVariable(self, { Writeable: false }));
        return args;
    }
}