'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = simplify;

var _Boolean = require('./primitives/Boolean');

var _Boolean2 = _interopRequireDefault(_Boolean);

var _Number = require('./primitives/Number');

var _Number2 = _interopRequireDefault(_Number);

var _String = require('./primitives/String');

var _String2 = _interopRequireDefault(_String);

var _Array = require('./primitives/Array');

var _Array2 = _interopRequireDefault(_Array);

var _types = require('../../tokenizer/consts/types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function simplify(token) {
    switch (token.Type) {
        case _types.ClassType.Boolean:
            return _Boolean2.default.create(token);
        case _types.ClassType.Number:
            return _Number2.default.create(token);
        case _types.ClassType.String:
            return _String2.default.create(token);
        case _types.ClassType.Array:
            return _Array2.default.create(token);
    }
    return undefined;
}
module.exports = exports['default'];