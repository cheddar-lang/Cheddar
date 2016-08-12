import CheddarFunction from '../env/func';
import CheddarVariableToken from '../../../tokenizer/literals/var';
import eval_prop from '../eval/prop';
import CheddarEval from '../eval/eval';

let $0 = new CheddarVariableToken();
$0._Tokens = ['$0'];

export default function(prop) {
    // Inject `$0` variable to the beginning of the property
    prop._Tokens.unshift($0);

    return new CheddarFunction([
        ["$0", {}]
    ], function(scope, input) {
        return eval_prop(prop, scope, CheddarEval);
    });
}