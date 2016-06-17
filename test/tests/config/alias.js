var chai = require('chai');

chai.should();

// the .es6 files won't work, because they use import which node doesn't support. that's why we have babel-node, it means the code coverage shows the lines on the ES6 files too
// oh, okay, currently the `make test` doesn't use babel-node I don't think, should I just add `babel-node` to the beginning
// thouguh, but babel-node still have to compile a lot of stuff (almost all of cheddar)
//  in which case idk if we should recompile
// tests should be called before you commit to origin, not necessarily every ten minutes. I wouldn't worry about speed
//  ;_; okay
import CheddarString from '../../../src/interpreter/core/primitives/String.es6';
import CheddarNumber from '../../../src/interpreter/core/primitives/Number.es6';
import CheddarArray  from '../../../src/interpreter/core/primitives/Array.es6' ;
import CheddarBool   from '../../../src/interpreter/core/primitives/Bool.es6'  ;

var result = new Map([
    ['String', CheddarString],
    ['Number', CheddarNumber],
    ['Array' , CheddarArray ],
    ['Bool'  , CheddarBool  ],
]);

var Alias = require('../../../src/interpreter/core/config/alias.es6');

describe('alias config', () => {
    it ('should provide a correct result', () => {
        Alias.should.equal(result);
    })
})