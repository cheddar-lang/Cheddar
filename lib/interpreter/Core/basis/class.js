"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Basic CheddarClass class
// Integrates directly with
//  an execution enviorment
//  that way, each class can
//  have it's own namespace
// Somehow it will have to
//  inheit.
// Perhaps what each part should do:
//  ExecutionEnviorment
//    |- Sandboxed Enviorment
//    |    ^
//    |    |- Crossdepedent scoping
//    |    v
//    |- Scope
//    |   |- Inheritence
//    |- Preset data

class CheddarClass {}
exports.default = CheddarClass;
module.exports = exports['default'];