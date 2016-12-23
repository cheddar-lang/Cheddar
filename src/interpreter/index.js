import CheddarExec from './exec';
export default class CheddarInterface extends CheddarExec {
    constructor(exec_stack, scope) {
        super(exec_stack, scope);
    }

    exec(OPTS) {
        if (OPTS) global.CHEDDAR_OPTS = OPTS;
        if (!global.bindings) global.bindings = require('../../bindings/');

        return super.exec();
    }
}
