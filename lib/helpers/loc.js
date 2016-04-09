"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = HelperLocateIndex;
// Locates an Column:Row given an index

function HelperLocateIndex(Code, Index) {
    let num = 1; // Line #
    let last = 0; // Last newline

    for (let i = 0; i <= Index; i++) if (Code[i] === "\n") {
        num++;last = i;
    } else if (i === Index) return [num, i - last];
}
module.exports = exports['default'];