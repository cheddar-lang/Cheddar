'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _scope = require('./scope');

var _scope2 = _interopRequireDefault(_scope);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CheddarExecutionEnvironment {
    constructor(preset) {
        let inherit = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];


        if (inherit) this.Scope = inherit.Scope;else this.Scope = new _scope2.default();

        if (preset) this.Scope.Scope = preset;
    }

}
exports.default = CheddarExecutionEnvironment; // Basic idea of the Execution Enviorment class:
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

module.exports = exports['default'];