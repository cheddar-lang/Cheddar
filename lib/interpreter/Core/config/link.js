'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LITERAL_LINKS = undefined;

var _String = require('../primitives/String');

var _String2 = _interopRequireDefault(_String);

var _Number = require('../primitives/Number');

var _Number2 = _interopRequireDefault(_Number);

var _Array = require('../primitives/Array');

var _Array2 = _interopRequireDefault(_Array);

var _Bool = require('../primitives/Bool');

var _Bool2 = _interopRequireDefault(_Bool);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LITERAL_LINKS = exports.LITERAL_LINKS = new Map([["CheddarStringToken", _String2.default], ["CheddarNumberToken", _Number2.default], ["CheddarBooleanToken", _Bool2.default][("CheddarArrayToken", _Array2.default)]]);