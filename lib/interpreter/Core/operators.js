'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.POSTFIX_OPS = exports.PREFIX_OPS = exports.OPS = undefined;

var _types = require('../../tokenizer/consts/types');

var _Boolean = require('./primitives/Boolean');

var _Boolean2 = _interopRequireDefault(_Boolean);

var _Number = require('./primitives/Number');

var _Number2 = _interopRequireDefault(_Number);

var _String = require('./primitives/String');

var _String2 = _interopRequireDefault(_String);

var _Array = require('./primitives/Array');

var _Array2 = _interopRequireDefault(_Array);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

let B = _types.ClassType.Boolean,
    N = _types.ClassType.Number,
    S = _types.ClassType.String,
    A = _types.ClassType.Array;

function bool(Bool) {
    return _Boolean2.default.create(Bool);
}

function num(Num) {
    return _Number2.default.create(Num);
}

function str(Str) {
    return _String2.default.create(Str);
}

function arr(Arr) {
    return _Array2.default.create(Arr);
}

function repeatStr(Str, Times) {
    return str(Str.repeat(Math.ceil(Times)).slice(0, Math.round(Times * Str.length)));
}

function repeatArr(Arr, Times) {
    let origLen = Arr.length,
        len = Math.round(Arr.length * Times),
        array = new Array(len);
    for (let i = 0; i < len; i++) array[i] = num(Arr[i % origLen]);
    return arr(array);
}

const OPS = exports.OPS = new Map([
//TODO
['+', new Map([[B, new Map([[B, (l, r) => bool(l || r)], [N, (l, r) => num((l ? 1 : 0) - r)], [S, (l, r) => str(l + r)]])], [N, new Map([[B, (l, r) => num(l + (r ? 1 : 0))], [N, (l, r) => num(l + r)], [S, (l, r) => str(l + r)]])], [S, new Map([[B, (l, r) => str(l + r)], [N, (l, r) => str(l + r)], [S, (l, r) => str(l + r)]])], [A, new Map([[B, (l, r) => arr([].concat(_toConsumableArray(l), [r]))], [N, (l, r) => arr([].concat(_toConsumableArray(l), [r]))], [S, (l, r) => arr([].concat(_toConsumableArray(l), [r]))], [A, (l, r) => arr(l.concat(r))]])]])], ['-', new Map([[B, new Map([[B, (l, r) => bool(l && !r)], [N, (l, r) => num((l ? 1 : 0) - r)]])], [N, new Map([[B, (l, r) => num(l - (r ? 1 : 0))], [N, (l, r) => num(l - r)]])], [S, new Map([])]])], ['*', new Map([[B, new Map([[B, (l, r) => bool(l && r)], [N, (l, r) => num(l ? r : 0)], [N, (l, r) => str(l ? r : '')]])], [N, new Map([[B, (l, r) => num(r ? l : 0)], [N, (l, r) => num(l * r)], [S, (l, r) => repeatStr(r, l)], [A, (l, r) => repeatArr(r, l)]])], [S, new Map([[B, (l, r) => str(r ? l : '')], [N, (l, r) => repeatStr(l, r)]])], [A, new Map([[B, (l, r) => arr(r ? l : [])], [N, (l, r) => repeatArr(l, r)]])]])], ['/', new Map([[B, new Map([[B, (l, r) => bool(l && !r)]])], [N, new Map([[N, (l, r) => num(l / r)]])], [S, new Map([[N, (l, r) => repeatStr(l, 1 / r)]])], [A, new Map([[N, (l, r) => repeatArr(l, 1 / r)]])]])], ['^', new Map([[N, new Map([[N, (l, r) => num(Math.pow(l, r))]])]])]]);

const PREFIX_OPS = exports.PREFIX_OPS = new Map([
//TODO
['-', new Map([[N, x => num(-x)]])], ['+', new Map([[N, x => num(x)]])], ['print', new Map([[B, x => {
    console.log(x.toString());return bool(x);
}], //clone
[N, x => {
    console.log(x.toString());return num(x);
}], [S, x => {
    console.log(x.toString());return str(x);
}], [A, x => {
    console.log(x.toString());return arr(x);
}]])], ['cos', new Map([[N, x => num(Math.cos(x))]])], ['sin', new Map([[N, x => num(Math.sin(x))]])], ['tan', new Map([[N, x => num(Math.tan(x))]])], ['acos', new Map([[N, x => num(Math.acos(x))]])], ['asin', new Map([[N, x => num(Math.asin(x))]])], ['atan', new Map([[N, x => num(Math.atan(x))]])], ['cosh', new Map([[N, x => num(Math.cosh(x))]])], ['sinh', new Map([[N, x => num(Math.sinh(x))]])], ['tanh', new Map([[N, x => num(Math.tanh(x))]])], ['acosh', new Map([[N, x => num(Math.acosh(x))]])], ['asinh', new Map([[N, x => num(Math.asinh(x))]])], ['atanh', new Map([[N, x => num(Math.atanh(x))]])], ['abs', new Map([[N, x => num(Math.abs(x))]])], ['sqrt', new Map([[N, x => num(Math.sqrt(x))]])], ['cbrt', new Map([[N, x => num(Math.cbrt(x))]])], ['floor', new Map([[N, x => num(Math.floor(x))]])], ['ceil', new Map([[N, x => num(Math.ceil(x))]])], ['round', new Map([[N, x => num(Math.round(x))]])], ['clz32', new Map([[N, x => num(Math.clz32(x))]])], ['exp', new Map([[N, x => num(Math.exp(x))]])], ['expm1', new Map([[N, x => num(Math.expm1(x))]])], ['fround', new Map([[N, x => num(Math.fround(x))]])], ['imul', new Map([[N, x => num(Math.imul(x))]])], ['log', new Map([[N, x => num(Math.log(x))]])], ['log10', new Map([[N, x => num(Math.log10(x))]])], ['log1p', new Map([[N, x => num(Math.log1p(x))]])], ['log2', new Map([[N, x => num(Math.log2(x))]])], ['sign', new Map([[N, x => num(Math.sign(x))]])]]);

// not used yet
const POSTFIX_OPS = exports.POSTFIX_OPS = new Map([
    //TODO
]);