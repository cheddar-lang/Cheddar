// Basic idea of the Execution Enviorment class:
//
//  ExecutionEnviorment
//    |    ^
//    |- Sandboxed Enviorment
//    |    |- Crossdepedent scoping
//    |    |    ^
//    |    v    | - Inheritence Chain
//    |- Scope  v
//    |   |- Inheritence
//    |- Preset data

import CheddarExecutionScope from './scope';
import CheddarError from '../consts/err';

export default class CheddarExecutionEnvironment {
    constructor(preset = new CheddarExecutionScope()) {

        // Global scope
        // Make sure to move preset items
        // Avoid duplicating scopes
        //  by providing a loopup within
        //  a seperate hash which is linked
        //  by overriding a properties get
        this.Scope = inherit;

    }

    // overload <accessor>[access] -> access
    accessor(access) {
        return this.Scope.get(access);
    }

    access(path) {
        // Access state:
        // <ExecutionEnviorment>
        //  |- ExecutionScope[attempt](path)
        //  ^   |- <ExecutionEnviorment>[has](path)
        //  |       |- <ExecutionScope>[Accessor](access)
        //  |   +--------|
        //  |   |- <ExecutionToken> ===> <OUTPUT>
        //  |_________|

        let access = this.accessor(path.pop());
        if (access !== CheddarError.KEY_NOT_FOUND) {
            // Accessor found access
            if (path.length)
                return access.accessor(path)
            else
                return access;
        } else {
            return CheddarError.KEY_NOT_FOUND;
        }
    }

    add_scope() {
        return new CheddarExecutionScope(this.Scope);
    }

}