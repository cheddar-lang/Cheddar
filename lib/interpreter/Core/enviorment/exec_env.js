'use strict';

var _scope = require('./scope');

var _scope2 = _interopRequireDefault(_scope);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ExecutionEnviorment {
    constructor(preset) {
        let inherit = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

        if (inherit) this.Scope = inherit.Scope;else this.Scope = new _scope2.default();

        this.Scope;
    }
} // Basic idea of the Execution Enviorment class:
//
//  ExecutionEnviorment
//    |- Sandboxed Scopes
//    |    ^
//    |    |- Crossdepedent scoping
//    |    v
//    |- Scope
//    |   |- Inheritence
//    |            ^
//    |            |
//    |            |
//    |- Classing  v
//    |   |- Properties
//    |
//    |- Preset data