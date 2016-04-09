'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _exec_env = require('./enviorment/exec_env');

var _exec_env2 = _interopRequireDefault(_exec_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Enviorment {
    constructor() {
        // The enviorment scope
        this.env = new _exec_env2.default();
        this.working_scope = this.env.Scope;
    }

    set_working_scope(scope) {}
}
exports.default = Enviorment;
module.exports = exports['default'];