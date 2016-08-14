import CheddarClass from '../env/class';
import HelperInit from '../../../helpers/init';

export default class NIL extends CheddarClass {
    static Name = "nil";

    init = () => true;

    Cast = new Map([...CheddarClass.Operator,
        ['String', () => HelperInit(
            require('../primitives/String'),
            "nil"
        ),
        'Bool', () => HelperInit(
            require('../primitives/Bool'),
            false
        )]
    ]);
}