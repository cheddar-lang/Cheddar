'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _err = require('../consts/err');

var CheddarError = _interopRequireWildcard(_err);

var _any = require('./any');

var _any2 = _interopRequireDefault(_any);

var _literal = require('../literals/literal');

var _literal2 = _interopRequireDefault(_literal);

var _lex = require('../tok/lex');

var _lex2 = _interopRequireDefault(_lex);

var _array = require('./array');

var _array2 = _interopRequireDefault(_array);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//TODO: make it do stuff when types are implemented
class CheddarTypedLiteral extends _lex2.default {
    exec() {
        let LITERAL = arguments.length <= 0 || arguments[0] === undefined ? [_array2.default.makeparser('(', ')'), _any2.default] : arguments[0];

        this.open(false);

        return this.grammar(true, [_literal2.default, ':', LITERAL], [_any2.default]);
    }
    static makeparser(arg) {
        let passed = new _lex2.default();
        passed.exec = function () {
            return new CheddarTypedLiteral(this.Code, this.Index).exec(arg);
        };
        return passed;
    }
}
exports.default = CheddarTypedLiteral;
module.exports = exports['default'];