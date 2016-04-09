import CheddarExecutionEnvironment from './enviorment/exec_env';

export default class Enviorment {
    constructor() {
        // The enviorment scope
        this.env = new CheddarExecutionEnvironment();
        this.working_scope = this.env.Scope;
    }

    set_working_scope(scope) {

    }
}