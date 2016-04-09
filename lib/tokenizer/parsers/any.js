'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lex = require('../tok/lex');

var _lex2 = _interopRequireDefault(_lex);

var _boolean = require('../literals/boolean');

var _boolean2 = _interopRequireDefault(_boolean);

var _string = require('../literals/string');

var _string2 = _interopRequireDefault(_string);

var _number = require('../literals/number');

var _number2 = _interopRequireDefault(_number);

var _array = require('./array');

var _array2 = _interopRequireDefault(_array);

var _block = require('./block');

var _block2 = _interopRequireDefault(_block);

var _function = require('./function');

var _function2 = _interopRequireDefault(_function);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CheddarAnyLiteral extends _lex2.default {
    exec() {
        this.open(false);

        let attempt = this.attempt(_string2.default, _number2.default, _boolean2.default, _array2.default, _function2.default);

        if (attempt instanceof _lex2.default) return this.close(attempt);else return this.error(attempt);
    }
}
exports.default = CheddarAnyLiteral;
module.exports = exports['default'];