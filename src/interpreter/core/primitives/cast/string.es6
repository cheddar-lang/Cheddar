// Standard error
import * as CheddarError from '../../consts/err';

// Dependencies
import CheddarNumber from '../Number';

// Tokenizers
import CheddarLexer from '../../../../tokenizer/tok/lex';
import CheddarNumberToken from '../../../../tokenizer/literals/number';

import HelperInit from '../../../../helpers/init';

export default new Map([
    [CheddarNumber, (LHS) => {
        let Attempt = new CheddarNumberToken(LHS, 0).exec();
        if (Attempt instanceof CheddarLexer)
            return new CheddarNumber(...Attempt._Tokens)
        else
            return CheddarError.CAST_FAILED;
    }]
]);

/*
class A {
    cast from String (args) {

    }
}


CLASS ::= class <identifier> <idlist> {
              <ITEM> (\n<ITEM> | })
ITEM  ::= main <codeblock> |
          (cast (from|to)|(get|set))? <indentifier> <arglist> <codeblock> |
*/