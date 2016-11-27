// Standard error
import * as CheddarError from '../../consts/err';

// Dependencies
import CheddarNumber from '../Number';

// Tokenizers
import CheddarLexer from 'cheddar-parser/dist/tok/lex';
import CheddarNumberToken from 'cheddar-parser/dist/literals/number';

import HelperInit from '../../../../helpers/init';

export default new Map([
    ['Number', (LHS) => {
        let Attempt = new CheddarNumberToken(LHS.value, 0).exec();

        if (Attempt instanceof CheddarLexer)
            return HelperInit(CheddarNumber, ...Attempt._Tokens);
        else
            return CheddarError.CAST_FAILED;
    }],
    ['String', (self) => {
        return HelperInit(self.constructor, '"' + self.value.replace(
            /"|\\/g, "\\$&"
        ) + '"');
    }],
]);

/*
class A {
    cast from String (args) {

    }
}


CLASS ::= class <identifier> <idlist> {
              <ITEM> (\n<ITEM> | })
ITEM  ::= init <codeblock> |
          (cast (from|to)|(get|set))? <indentifier> <arglist> <codeblock> |
          (assignby (copy|reference))|
*/
