import CheddarClass from '../env/class';
import HelperInit from '../../../helpers/init';

export default class INFINITY extends CheddarClass {
    static Name = 'Infinity';

    init = () => true;

    Cast = new Map([...CheddarClass.Operator,
        ['String', () => HelperInit(
            require('../primitives/String'),
            'Infinity'
        ),
        'Number', () => HelperInit(
            require('../primitives/Number'),
            Infinity
        )]
    ]);
}
