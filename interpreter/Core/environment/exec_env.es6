// Basic idea of the Execution Enviorment class:
//
//  ExecutionEnviorment
//    |- Sandboxed Enviorment
//    |    ^
//    |    |- Crossdepedent scoping
//    |    |    ^
//    |    v    | - Inheritence Chain
//    |- Scope  v
//    |   |- Inheritence
//    |- Preset data

import CheddarExecutionScope from './scope';

export default class CheddarExecutionEnvironment {
    constructor(preset, inherit = false) {

        this.Scope = inherit.Scope;
        this.Children = [];
    }

    add_scope() {
        let ExecutionScope = new CheddarExecutionScope(this.Scope);
        this.Children.push(ExecutionScope);
        return ExecutionScope;
    }

}