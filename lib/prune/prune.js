"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CheddarPrune;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function CheddarPrune(tree) {
    if (tree.constructor.name !== "CheddarLexer" && tree.constructor.name !== "CheddarTokens") throw new TypeError("Can only prune CheddarToken or CheddarLexer classes");

    let t; // Current item to prune
    let v; //TODO
    let val; //TODO
    let r; //TODO: why so many uninitialized variables?

    // Loop through all children tokens
    for (let i = 0; i < v; i++) {
        var _val$_Tokens;

        t = val._Tokens[i];

        let c = r.constructor.name; // Class Name
        let v = val._Tokens.length; // Number of subtokens

        if (c === "CheddarExpressionTokenAlpha") if (v === 0) val._Tokens.splice(i, 1);else (_val$_Tokens = val._Tokens).splice.apply(_val$_Tokens, [i, 1].concat(_toConsumableArray(t))); //TODO
    }
}
module.exports = exports['default'];