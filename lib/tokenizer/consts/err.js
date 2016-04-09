'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * DEFAULT ERROR CODES
 * Codes:
  0. Success
  1. Unexpected token
  2. Unexpected 
**/

const SUCCESS = exports.SUCCESS = Symbol('er_SUCCESS');
const EXIT_NOTFOUND = exports.EXIT_NOTFOUND = Symbol('er_EXIT_NOTFOUND');
const UNEXPECTED_TOKEN = exports.UNEXPECTED_TOKEN = Symbol('er_UNEXPECTED_TOKEN');
const UNMATCHED_DELIMITER = exports.UNMATCHED_DELIMITER = Symbol('er_UNMATCHED_DELIMITER');