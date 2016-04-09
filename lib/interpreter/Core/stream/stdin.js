"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _handler = require("./handler");

var _handler2 = _interopRequireDefault(_handler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class StreamSTDOUT extends _handler2.default {
    append(data) {
        this.Update(data + (line ? "\n" : ""));
    }
}
exports.default = StreamSTDOUT;
module.exports = exports['default'];