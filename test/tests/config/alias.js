var chai = require('chai');

chai.should();

var CheddarString = require('../../../dist/interpreter/core/config/primitives/String.js');
var CheddarNumber = require('../../../dist/interpreter/core/config/primitives/Number.js');
var CheddarArray  = require('../../../dist/interpreter/core/config/primitives/Array.js' );
var CheddarBool   = require('../../../dist/interpreter/core/config/primitives/Bool.js'  );

var result = new Map([
    ['String', CheddarString],
    ['Number', CheddarNumber],
    ['Array' , CheddarArray ],
    ['Bool'  , CheddarBool  ],
]);

var Alias = require('../../../dist/interpreter/core/config/alias.js');

describe('alias config', () => {
    it ('should provide a correct result', () => {
        Alias.should.equal(result);
    })
})